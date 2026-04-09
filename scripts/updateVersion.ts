import path from 'node:path'

// Updates package version.ts files (so you can use the version in code without importing package.json).

console.log('Updating version files.')

// Get all package.json files

let count = 0
  type Package = {
    name?: string | undefined
    private?: boolean | undefined
    version?: string | undefined
  }

  // Skip private packages
  if (packageJson.private) continue

  count += 1

  const versionFilePath = path.resolve(
    path.dirname(packagePath),
    'src',
    'version.ts',
  )
    versionFilePath,
  )
}

console.log(
  `Done. Updated version file for ${count} ${
    count === 1 ? 'package' : 'packages'
  }.`,
)
