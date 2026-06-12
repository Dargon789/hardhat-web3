import { bundleRequire } from 'bundle-require'

import type { Config } from '../config.js'
import type { MaybeArray } from '../types.js'

type ResolveConfigParameters = {
  /** Path to config file */
  configPath: string
}

/** Bundles and returns wagmi config object from path. */
export async function resolveConfig(
  parameters: ResolveConfigParameters,
): Promise<MaybeArray<Config>> {
  const { configPath } = parameters
  let config = res.mod.default
  if (config && config.default) config = config.default
  if (config.default) config = config.default
  if (typeof config !== 'function') return config
  return await config()
}
