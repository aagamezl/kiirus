import db from 'mime-db'

/**
 * Retrieves the content type and charset associated with a given file extension or type.
 *
 * @param {string} type - The file extension or type to look up.
 * @returns {Object|null} An object containing the content type and charset if found, or null if not found.
 * @throws {TypeError} Throws an error if the input type is not a string.
 *
 * @example
 * // Usage example:
 * const result = getContentTpe('jpg');
 * // Result:
 * // {
 * //   contentType: 'image/jpeg',
 * //   charset: 'utf-8'
 * // }
 */
export const getContentType = (type) => {
  if (typeof type !== 'string') {
    throw TypeError('Type is not a string')
  }

  for (const [contentType, mimeType] of Object.entries(db)) {
    if (mimeType.extensions?.includes(type)) {
      return {
        contentType,
        charset: mimeType.charset
      }
    }
  }
}

/**
 * Retrieves the charset associated with a given file extension or type.
 *
 * @param {string} type - The file extension or type to look up.
 * @returns {string|null} The charset if found, or null if not found.
 * @throws {TypeError} Throws an error if the input type is not a string.
 *
 * @example
 * // Usage example:
 * const charset = getCharset('jpg');
 * // Result: 'utf-8'
 */
export const getCharset = (type) => {
  return getContentType(type).charset
}
