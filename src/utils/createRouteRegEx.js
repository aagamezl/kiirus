import createMatcher from './createMatcher.js'

/**
 *
 * @param {string} path
 * @param {import('../Router.js').DefaultOptions} options
 * @returns {RegExp}
 */
const createRouteRegEx = (path, { caseSensitive, mergeParams, strict }) => {
  path = path.endsWith('/') ? path : `${path}/`
  const flags = caseSensitive ? '' : 'i'
  const pattern = strict ? `^${path}$` : `^${path}?$`
  return createMatcher(new RegExp(pattern.replace(/:([\w-]+)+/g, '(?<$1>[\\w-]+)'), flags))
}

export default createRouteRegEx
