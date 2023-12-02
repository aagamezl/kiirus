/**
 *
 * @param {object} destination
 * @param {object} source
 * @param {boolean} [overwrite=true]
 * @returns {object}
 */
const mergeDescriptors = (destination, source, overwrite = true) => {
  if (!destination) {
    throw new TypeError('The `destination` argument is required.')
  }

  if (!source) {
    throw new TypeError('The `source` argument is required.')
  }

  for (const name of Object.getOwnPropertyNames(source)) {
    if (!overwrite && Object.hasOwn(destination, name)) {
      // Skip descriptor
      continue
    }

    // Copy descriptor
    /** @type {PropertyDescriptor} */
    const descriptor = Object.getOwnPropertyDescriptor(source, name)
    Object.defineProperty(destination, name, descriptor)
  }

  return destination
}

export default mergeDescriptors
