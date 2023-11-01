import application from './application.js'
import router from './router.js'
import formData from './utils/decoders/formData.js'

const CONTENT_TYPE = {
  FORM_DATA: 'multipart/form-data',
  JSON: 'application/json; charset=utf-8',
  URL_ENCODED: 'application/x-www-form-urlencoded'
}

/**
 * Create an mocaccino application.
 *
 * @typedef {Object} BaseMocaccino
 * @property {() => import('./router').Router} Router - A function to create a router object.
 * @property {(options?: object) => (req: Request, res: Response, next: Function) => void} formData - A function to create middleware that parses Form-Data bodies.
 * @property {(options?: object) => (req: Request, res: Response, next: Function) => void} json - A function to create middleware that parses JSON bodies.
 * @property {(options?: object) => (req: Request, res: Response, next: Function) => void} raw - A function to create middleware that parses incoming request payloads into a Buffer.
 * @property {(root: string, options?: object) => (req: Request, res: Response, next: Function) => void} static - A function to create middleware to serve static files.
 * @property {(options?: object) => (req: Request, res: Response, next: Function) => void} text - A function to create middleware that parses text bodies.
 * @property {(options?: object) => (req: Request, res: Response, next: Function) => void} urlencoded - A function to create middleware that parses x-www-form-urlencoded bodies.
 *
 * @typedef {BaseMocaccino & import('./application.js').Application} Mocaccino
 */

/**
 *
 * @returns {Mocaccino}
 */
const mocaccino = () => {
  return {
    ...application()
  }
}

/**
 * Create a middleware that parses Form-Data bodies.
 * @function
 * @param {object} [options] - Options for JSON parsing middleware.
 * @returns {function} JSON parsing middleware.
 */
mocaccino.formData = () => {
  return (req, res, next) => {
    // Check if there is data in the request body based on the Content-Length header
    const contentLength = (req.headers['content-length'] ?? '0') | 0
    const [contentType] = (req.headers['content-type'] ?? '').split(';')

    if (contentType === CONTENT_TYPE.FORM_DATA && contentLength > 0) {
      const bodyBuffer = []

      req.on('data', (chunk) => {
        bodyBuffer.push(chunk)
      })

      req.on('end', () => {
        const formDataResult = formData(bodyBuffer, req.headers)
        req.files = formDataResult.files
        req.body = formDataResult.body

        next()
      })
    } else {
      next()
    }
  }
}

/**
 * Create a middleware that parses JSON bodies.
 * @function
 * @param {object} [options] - Options for JSON parsing middleware.
 * @returns {function} JSON parsing middleware.
 */
mocaccino.json = (options) => {
  return (req, res, next) => {
    // Check if there is data in the request body based on the Content-Length header
    const contentLength = (req.headers['content-length'] ?? '0') | 0
    const [contentType] = (req.headers['content-type'] ?? '').split(';')

    if (contentType === CONTENT_TYPE.JSON && contentLength > 0) {
      const bodyBuffer = []

      req.on('data', (chunk) => {
        bodyBuffer.push(chunk)
      })

      req.on('end', () => {
        req.body = JSON.parse(Buffer.concat(bodyBuffer).toString())

        next()
      })
    } else {
      next()
    }
  }
}

/**
 * Create a middleware that parses incoming request payloads into a Buffer
 * @function
 * @param {object} [options] - Options for raw body parsing middleware.
 * @returns {function} Raw body parsing middleware.
 */
mocaccino.raw = (options) => {
  // Implementation here
}

/**
 * Create a router object.
 * @function
 * @returns {import('./router').Router} An Mocaccino router instance.
 */
mocaccino.Router = () => {
  return router()
}

/**
 * Create a middleware to serve static files.
 * @function
 * @param {string} root - The root directory from which to serve static assets.
 * @param {object} [options] - Options for static file serving middleware.
 * @returns {function} Static file serving middleware.
 */
mocaccino.static = (root, options) => {
  // Implementation here
}

/**
 * Create a middleware that parses text bodies.
 * @function
 * @param {object} [options] - Options for text body parsing middleware.
 * @returns {function} Text body parsing middleware.
 */
mocaccino.text = (options) => {
  // Implementation here
}

/**
 * Built-in middleware in Mocaccino.js. The main objective of this method is to
 * parse the incoming request with urlencoded payloads and is based upon the.
 *
 * This method returns the middleware that parses all the urlencoded bodies.
 *
 * @param {object} [options]
 * @returns {function} x-www-form-urlencoded parsing middleware.
 */
mocaccino.urlencoded = (options) => {
  return (req, res, next) => {
    // Check if there is data in the request body based on the Content-Length header
    const contentLength = (req.headers['content-length'] ?? '0') | 0
    const [contentType] = (req.headers['content-type'] ?? '').split(';')

    if (contentType === CONTENT_TYPE.URL_ENCODED && contentLength > 0) {
      const bodyBuffer = []

      req.on('data', (chunk) => {
        bodyBuffer.push(chunk)
      })

      req.on('end', () => {
        req.body = decodeURIComponent(Buffer.concat(bodyBuffer).toString())
          .split('&')
          .reduce((formData, pair) => {
            // if (options.extendex === true) {

            // }

            const [key, value] = pair.split('=')
            formData[decodeURIComponent(key)] = decodeURIComponent(value)

            return formData
          }, {})

        next()
      })
    } else {
      next()
    }
  }
}

export default mocaccino
