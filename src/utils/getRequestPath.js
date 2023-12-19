/**
 * Get the request path, using the Request.url and req.headers.host
 *
 * @param {Request} req
 * @returns {string}
 */
const getRequestPath = (req) => {
  return req.url.split(req.headers.get('host') ?? '').at(-1) ?? ''
}

export default getRequestPath
