import type {
  ImportResolutionError,
  NpmRootResolutionError,
  ProjectRootResolutionError,
  UserRemappingError,
} from "../../../../../types/solidity/errors.js";
import type {
  NpmPackageResolvedFile,
  ProjectResolvedFile,
  ResolvedFile,
  ResolvedNpmPackage,
} from "../../../../../types/solidity/resolved-file.js";

/**
 * A result that can either have a value or an error.
 */
export type Result<ValueT, ErrorT> =
  | { readonly success: true; readonly value: ValueT }
  | { readonly success: false; readonly error: ErrorT };

/**
 * A solc remapping.
 */
export interface Remapping {
  readonly context: string;
  readonly prefix: string;
  readonly target: string;
}

/**
 * A Resolver is a stateful object that can be used to to construct a dependency
 * graph, by resolving both the local project and npm files, and their imports.
 *
 * As part of the resolution process, it generates the list of remappings that
 * are needed to build the project.
 *
 * This resolver uses `sourceName`s to identify the resolved files, which are
 * not necessarily related to the file path.
 *
 * The `sourceName` of a Hardhat project file is its relative path from the
 * project root. For example, if the project root is `/home/user/project`, and
 * there are files `/home/user/project/contracts/File.sol` and
 * `home/user/project/File2.sol`, their source names are `contracts/File.sol`
 * and `File2.sol`.
 *
 * The `sourceName` of an npm file is `npm/<package-name>@<version>/<path>`.
 * This is constructed by using the Node.js resolution algorithm, to resolve
 * an npm file or import, and using the package's `package.json` file to
 * determine the source name. For example, if we import `foo/bar.sol`, its
 * source name could be `npm/foo@1.2.3/bar.sol`.
 *
 * If the Node.js resolution algorithm resolve a file into a package that's
 * part of the monorepo where the Hardhat project is (i.e. it's not part of a
 * `node_modules` directory), the source name is going to be
 * `npm/package@local/path/to/file`.
 *
 * Note that in the Node.js ecosystem, a package manager may install multiple
 * instances of the same package and version (i.e. fail to deduplicate them).
 * In those cases the Resolver will use the first instance it finds, and will
 * always resolve to that one.
 *
 * Finally, the current version of the resolver doesn't support npm packages
 * that use `pacakge.json#exports`.
 */
export interface Resolver {
  /**
   * Resolve a Hardhat project file.
   *
   * @param absoluteFilePath The absolute path to the file.
   * @returns The resolved file.
   */
  resolveProjectFile(absoluteFilePath: string): Promise<ProjectResolvedFile>;

  /**
   * Resolves an npm package file, which must be a dependency available in the
   * Hardhat project.
   *
   * This method is only meant to be used when an npm file needs to be rebuilt
   * to emit its artifacts, because the user requested it through their config.
   *
   * @param npmModule The npm module to resolve, in the form of
   * `<package-name>/<file-path>`.
   * @returns The resolved file.
   */
  resolveNpmDependencyFileAsRoot(
    npmModule: string,
  ): Promise<NpmPackageResolvedFile>;

  /**
   * Resolves an import.
   *
   * @param from The file where the import statement is located.
   * @param importPath The import path, as written in the source code. For
   * example, if the import statement is `import "./foo.sol";`, the import
   * path is `./foo.sol`.
   * @returns The imported file.
   */
  resolveImport(from: ResolvedFile, importPath: string): Promise<ResolvedFile>;

  /**
   * Returns the list of remappings needed to build the project.
   *
   * TODO: Does this include all the user remappings? Only the necessary ones?
   * What if we are only compiling parts of the dependency graph of it?
   */
  getRemappings(): Remapping[];
}

/**
 * The type of user remapping.
 */
export enum UserRemappingType {
  LOCAL = "LOCAL",
  NPM = "NPM",
}

/**
 * A base interface for user remappings.
 */
export interface BaseUserRemapping extends Remapping {
  readonly originalFormat: string;
  readonly source: string;
}

/**
 * A local user remapping.
 */
export interface LocalUserRemapping extends BaseUserRemapping {
  readonly type: UserRemappingType.LOCAL;
}

/**
 * An unresolved npm user remapping, whose context and prefix hasn't been
 * processed yet, and whose target npm package hasn't been loaded.
 *
 * This interface should only be internal to the RemappedNpmPackagesMap, but its
 * exported here for testing purposes.
 *
 * Note that instead of using this throught the codebase, RemappedNpmPackagesMap
 * should resolve it and return a ResolvedNpmUserRemapping.
 */
export interface UnresolvedNpmUserRemapping extends BaseUserRemapping {
  readonly type: "UNRESOLVED_NPM";
  readonly installationName: InstallationName;
}

/**
 * A resolved npm user remapping.
 */
export interface ResolvedNpmUserRemapping extends BaseUserRemapping, Remapping {
  readonly type: UserRemappingType.NPM;
  readonly originalFormat: string;
  readonly source: string;
  readonly targetNpmPackage: {
    readonly installationName: InstallationName;
    readonly package: ResolvedNpmPackage;
  };
}

/**
 * A resolved user remapping.
 */
export type ResolvedUserRemapping =
  | LocalUserRemapping
  | ResolvedNpmUserRemapping;

/**
 * Npm packages can be installed with different names than the one declared in
 * the package.json file. For example, example, `"my-foo": "npm:foo@1.2.3".
 *
 * We use this type alias to represent the installation name of a package.
 */
export type InstallationName = string;

/**
 * This interface represents a map of all the npm packages that the Hardhat
 * project uses, including the Hardhat projecct itself, and their remappings.
 *
 * This class guarantees that there's a single instance of any npm package per
 * each version. That means that, even if you have muiltiple installations of
 * the same package+version (i.e. npm didn't deduplicate them), we only load
 * one of them, and always use that one.
 *
 * It also guarantees that there's a single instance of each remapping object.
 *
 * While the remappings may seem a bit out of place here, they are more coupled
 * than expected, because:
 *  - Processing a remapping may require loading a new npm package, and this
 *    interface ensures its uniqueness.
 *  - Loading an npm package requires processing its remappigns.
 *  - Selecting the best user remapping for an import can require processing it
 *    and loading its npm package.
 *
 * These things, when combined, make this pretty complex, so please proceed
 * with caution when reading and modifying this class.
 *
 * NOTE: Instances of this interface should be protected by a mutex.
 * They are not thread/async-safe. If you don't do it, it can't ensure the
 * guarantees described above.
 */
export interface RemappedNpmPackagesMap {
  /**
   * Returns the Hardhat project's package. i.e. the npm package of the project.
   */
  getHardhatProjectPackage(): ResolvedNpmPackage;

  /**
   * Resolves a dependency of the package `from` by its installation name.
   *
   * This method does not use the remappings of the package `from` to alter
   * the resolution process. It only loads npm packages, their remappings, and
   * resolves them.
   *
   * NOTE: This method may modify the map if necessary.
   *
   * @param from The package from which the dependency is being resolved.
   * @param installationName The installation name of the dependency.
   * @returns `undefined` if the dependency is not installed, or an object with
   * the dependency and the generated remapping to use it.
   */
  resolveDependencyByInstallationName(
    from: ResolvedNpmPackage,
    installationName: InstallationName,
  ): Promise<
    | undefined
    | {
        package: ResolvedNpmPackage;
        generatedRemapping: Remapping;
      }
  >;

  /**
   * Selects the best user remapping for an import, if any.
   *
   * If the best user remapping is has an npm package as target, it may need to
   * load it and process the package's own remappings. This can lead to
   * remapping errors being discovered.
   *
   *
   * @param from The file with the import.
   * @param importPath The import path, which must be a direct import.
   * @returns The best user remapping if any, or any error encountered while
   * processing the best user remapping.
   */
  selectBestUserRemapping(
    from: ResolvedFile,
    importPath: string,
  ): Promise<Result<Remapping | undefined, UserRemappingError[]>>;

  /**
   * Generates a new remapping into an npm file. This method is meant to be used
   * when we have package.exports, and we need to generate a remapping that
   * would remap a direct import into the resolved file.
   *
   * @param fromNpmPackage The npm package that is importing the file.
   * @param directImport The direct import.
   * @param targetSouceName The target's souce name.
   */
  generateRemappingIntoNpmFile(
    fromNpmPackage: ResolvedNpmPackage,
    directImport: string,
    targetSouceName: string,
  ): Promise<Remapping>;

  /**
   * Returns a JSON representation of the map.
   */
  toJSON(): RemappedNpmPackagesMapJson;
}

/**
 * A JSON representation of a RemappedNpmPackagesMap.
 */
export interface RemappedNpmPackagesMapJson {
  readonly hardhatProjectPackage: ResolvedNpmPackage;
  readonly packageByRootSourceName: Readonly<
    Record<string, ResolvedNpmPackage>
  >;
  readonly installationMap: Readonly<
    Record<
      string,
      Readonly<
        Record<
          InstallationName,
          {
            readonly package: ResolvedNpmPackage;
            readonly generatedRemapping: Remapping;
          }
        >
      >
    >
  >;
  readonly userRemappingsPerPackage: Record<
    string,
    ReadonlyArray<ResolvedUserRemapping | UnresolvedNpmUserRemapping>
  >;
  readonly generatedRemappingsIntoNpmFiles: Readonly<
    Record<string, Readonly<Record<string, Remapping>>>
  >;
}

/**
 * A Resolver is a stateful object that can be used to to construct a dependency
 * graph, by resolving both the local project and npm files, and their imports.
 *
 * This resolver uses `sourceName`s to identify the resolved files, which are
 * not necessarily related to the file path.
 *
 * The `sourceName` of a Hardhat project file is its relative path from the
 * project root, prefixed by `project/`. For example, if the project root is
 * `/home/user/foo`, and there are files `/home/user/foo/contracts/File.sol` and
 * `home/user/foo/File2.sol`, their source names are
 * `project/contracts/File.sol` and `project/File2.sol`.
 *
 * The `sourceName` of an npm file is `npm/<package-name>@<version>/<path>`.
 * This is constructed by using the Node.js resolution algorithm, to resolve
 * an npm file or import, and using the package's `package.json` file to
 * determine the source name. For example, if we import `foo/bar.sol`, its
 * source name could be `npm/foo@1.2.3/bar.sol`.
 *
 * If the Node.js resolution algorithm resolve a file into a package that's
 * part of the monorepo where the Hardhat project is (i.e. it's not part of a
 * `node_modules` directory), the source name is going to be
 * `npm/package@local/path/to/file`.
 *
 * Note that in the Node.js ecosystem, a package manager may install multiple
 * instances of the same package and version (i.e. fail to deduplicate them).
 * In those cases the Resolver will use the first instance it finds, and will
 * always resolve to that one.
 */
export interface NewResolver {
  resolveProjectFile(
    absoluteFilePath: string,
  ): Promise<Result<ProjectResolvedFile, ProjectRootResolutionError>>;

  resolveNpmDependencyFileAsRoot(
    npmModule: string,
  ): Promise<
    Result<
      { file: NpmPackageResolvedFile; remapping?: ResolvedNpmUserRemapping },
      NpmRootResolutionError
    >
  >;

  resolveImport(
    from: ResolvedFile,
    importPath: string,
  ): Promise<
    Result<
      { file: ResolvedFile; remapping?: Remapping | ResolvedUserRemapping },
      ImportResolutionError
    >
  >;
}
