/**
 * Converts a human-readable data size string to bytes.
 *
 * @param {string} size - The human-readable data size string (e.g., '1KB', '2MB', '3GB').
 * @returns {number} - The equivalent size in bytes.
 * @throws {Error} - If the input string is not in a valid format.
 *
 * @example
 * const result = bytesToSize('1KB');
 * console.log(result); // 1024
 */
const sizeToBytes = (size) => {
  const units = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024
  }

  const regex = /^(\d+)\s*([BKMGT]{1,2})$/i
  const match = size.match(regex)

  if (!match) {
    throw new Error('Invalid data size format. Use a format like "1KB", "2MB", "3GB", etc.')
  }

  const value = parseInt(match[1], 10)
  const unit = match[2].toUpperCase()

  if (!units[unit]) {
    throw new Error(`Invalid unit "${unit}". Use one of: B, KB, MB, GB, TB.`)
  }

  return value * units[unit]
}

export default sizeToBytes
