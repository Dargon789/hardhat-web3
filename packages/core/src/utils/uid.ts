import crypto from 'crypto'

const size = 256
let index = size
let buffer: string

function fillBufferWithSecureRandomHex() {
  const bytes = new Uint8Array(size)

  // Prefer Web Crypto if available (browser / modern runtimes)
  const globalCrypto = (globalThis as any).crypto
  if (globalCrypto && typeof globalCrypto.getRandomValues === 'function') {
    globalCrypto.getRandomValues(bytes)
  } else {
    // Fallback to Node.js crypto.randomBytes
    const nodeBytes = crypto.randomBytes(size)
    for (let i = 0; i < size; i++) {
      bytes[i] = nodeBytes[i]
    }
  }

  let hex = ''
  for (let i = 0; i < size; i++) {
    const byte = bytes[i]
    hex += byte.toString(16).padStart(2, '0')
  }
  buffer = hex
  index = 0
}

export function uid(length = 11) {
  if (!buffer || index + length > size * 2) {
    fillBufferWithSecureRandomHex()
  }
  return buffer.substring(index, index++ + length)
}
