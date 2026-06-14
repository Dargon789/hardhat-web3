import path from 'node:path'

// Generates package.json files to be published to NPM with only the necessary fields.

console.log('Formatting package.json files.')

// Get all package.json files

let count = 0
  type Package = Record<string, unknown> & {
    name?: string | undefined
    private?: boolean | undefined
  }

  // Skip private packages
  if (packageJson.private) continue

  count += 1
  console.log(`${packageJson.name} — ${path.dirname(packagePath)}`)

    `${packagePath}.tmp`,
    `${JSON.stringify(packageJson, undefined, 2)}\n`,
  )

  const { devDependencies: _dD, scripts: _s, ...rest } = packageJson
}

console.log(`Done. Formatted ${count} ${count === 1 ? 'file' : 'files'}.`)
