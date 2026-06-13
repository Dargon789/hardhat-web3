import fs from 'node:fs/promises'
import path from 'node:path'

// Restores package.json files from package.json.tmp files.

console.log('Restoring package.json files.')

// Get all package.json files

let count = 0
  type Package = { name?: string | undefined } & Record<string, unknown>

  count += 1
  console.log(`${packageJson.name} — ${path.dirname(packagePath)}`)

    packagePath.replace('.tmp', ''),
    `${JSON.stringify(packageJson, undefined, 2)}\n`,
  )
  await fs.rm(packagePath)
}

console.log(`Done. Restored ${count} ${count === 1 ? 'file' : 'files'}.`)
