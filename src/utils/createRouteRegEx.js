/**
 *
 * @param {string} path
 * @returns {RegExp}
 */
const createRouteRegEx = (path) => {
  return new RegExp(path.replace(/:([\w-]+)+/g, '(?<$1>[\\w-]+)'))
}

export default createRouteRegEx
