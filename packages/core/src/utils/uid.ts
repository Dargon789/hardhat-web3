const size = 256
let index = size
let buffer: string

function fillRandomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length)
  if (typeof globalThis !== 'undefined' && globalThis.crypto && typeof globalThis.crypto.getRandomValues === 'function') {
    globalThis.crypto.getRandomValues(bytes)
    return bytes
  }
  // Fallback for Node.js environments without globalThis.crypto
  // Import is required dynamically to avoid issues in non-Node environments.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nodeCrypto = require('crypto') as typeof import('crypto')
  const nodeBytes: Buffer = nodeCrypto.randomBytes(length)
  for (let i = 0; i < length; i++) {
    bytes[i] = nodeBytes[i]
  }
  return bytes
}

export function uid(length = 11) {
  if (!buffer || index + length > size * 2) {
    const bytes = fillRandomBytes(size)
    buffer = ''
    index = 0
    for (let i = 0; i < size; i++) {
      const hex = bytes[i].toString(16).padStart(2, '0')
      buffer += hex
    }
  }
  return buffer.substring(index, index++ + length)
}
