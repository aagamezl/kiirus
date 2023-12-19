/**
 *
 * @param {string} path
 * @param {import('../Router.js').Options} options
 * @returns {RegExp}
 */
const createRouteRegEx = (path, { caseSensitive, mergeParams, strict }) => {
  const flags = caseSensitive ? '' : 'i'
  const pattern = strict ? `^${path}$` : `^${path}?$`
  return new RegExp(pattern.replace(/:([\w-]+)+/g, '(?<$1>[\\w-]+)'), flags)
}

export default createRouteRegEx
