const size = 256
let index = size
let buffer: string

export function uid(length = 11) {
  if (!buffer || index + length > size * 2) {
  }
  return buffer.substring(index, index++ + length)
}
