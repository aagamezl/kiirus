/**
 *
 * @param {string} path
 * @returns {RegExp}
 */
const createRouteRegEx = (path, { caseSensitive, mergeParams, strict } = {}) => {
  // if (path.endsWith('/')) {
  //   if (strict) {
  //     path = `^${path}$`
  //   } else {
  //     path = `^${path}?$`
  //   }
  // }

  // return new RegExp((path.endsWith('/') ? `^${path}?$` : `^${path}/?$`).replace(/:([\w-]+)+/g, '(?<$1>[\\w-]+)'))
  // return new RegExp(path.replace(/:([\w-]+)+/g, '(?<$1>[\\w-]+)'))
  // return new RegExp((strict ? `^${path}?$` : `^${path}?$`).replace(/:([\w-]+)+/g, '(?<$1>[\\w-]+)'))

  path = path.endsWith('/') ? path : `${path}/`
  const flags = caseSensitive ? '' : 'i'
  const pattern = strict ? `^${path}$` : `^${path}?$`
  return new RegExp(pattern.replace(/:([\w-]+)+/g, '(?<$1>[\\w-]+)'), flags)
}

export default createRouteRegEx
