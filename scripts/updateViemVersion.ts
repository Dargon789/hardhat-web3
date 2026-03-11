// Updates viem version in Vitest snapshots, etc.

console.log('Updating Viem version.')

const viemVersion = packageJson.devDependencies.viem

// Update Vitest snapshots
// Get all *.test.ts files

let count = 0

  // Skip files that don't contain viem version
  if (!testFile.includes('Version: viem@')) continue
  // Skip files that contain current version
  if (testFile.includes(`Version: viem@${viemVersion}`)) continue

  const updatedTestFile = testFile.replace(
    `Version: viem@${viemVersion}`,
  )

  count += 1
}

// // Update package.json#pnpm.overrides.viem
// if (packageJson.pnpm?.overrides?.viem !== viemVersion) {
//   const path = 'package.json'
//   console.log(path)
//   packageJson.pnpm.overrides.viem = viemVersion
//   count += 1
// }

console.log(`Done. Updated ${count} ${count === 1 ? 'file' : 'files'}.`)
