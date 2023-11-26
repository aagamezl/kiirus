import { EventEmitter } from 'node:events'

// import application from './application.js'
import Application from './Application.js'
import Router from './Router.js'
import formData from './utils/decoders/formData.js'
import mergeDescriptors from './utils/mergerDescriptors.js'

const CONTENT_TYPE = {
  FORM_DATA: 'multipart/form-data',
  JSON: 'application/json; charset=utf-8',
  URL_ENCODED: 'application/x-www-form-urlencoded'
}

/**
 * Kiirus object with methods for formData, json, and static.
 * @typedef {Object} Kiirus
 * @property {() => import('./Router.js').Router} Router - Create a router object.
 * @property {(options?: object) => import('./Router.js').Middleware} formData - Create a middleware that parses Form-Data bodies.
 * @property {(options?: object) => import('./Router.js').Middleware} json - Create a middleware that parses JSON bodies.
 * @property {(options?: object) => import('./Router.js').Middleware} raw - Create a middleware that parses incoming request payloads into a Buffer.
 * @property {(root: string, options?: object) => import('./Router.js').Middleware} static - Create a middleware to serve static files.
 * @property {(options?: object) => import('./Router.js').Middleware} text - Create a middleware that parses text bodies.
 * @property {(options?: object) => import('./Router.js').Middleware} urlencoded - Create a middleware that parses x-www-form-urlencoded bodies.

 */

/**
 * Function to create a Kiirus object.
 * @returns {Application} The created Kiirus object.
 */
const kiirus = () => {
  // return {
  //   ...application()
  // }

  // const app = () => {}

  // return app

  // const proto = application()

  const proto = new Application()

  // This function is necessary to manage usage with http native module,
  // including testing libraries
  const app = (req, res, next) => {
    const fetchResponse = app.handleRequest(req, res, next)

    // Set the headers and status code for the Node.js HTTP response
    res.statusCode = fetchResponse.status

    for (const [key, value] of fetchResponse.headers.entries()) {
      res.setHeader(key, value)
    }

    // res.writeHead(statusCode, headers)

    if (!fetchResponse.body) {
      return res.end()
    }

    fetchResponse.body().then(async (buffer) => {
      res.write(buffer)
      res.end()
    })
  }

  mergeDescriptors(app, EventEmitter.prototype, false)
  mergeDescriptors(app, Object.getPrototypeOf(proto), false)
  // mergeDescriptors(app, proto, false)
  // mergeDescriptors(app, proto, false)
  // Object.setPrototypeOf(app, proto)
  Object.setPrototypeOf(app, proto)

  return app
}

/**
 * Create a middleware that parses Form-Data bodies.
 * @function
 * @param {object} [options] - Options for JSON parsing middleware.
 * @returns {import('./Router.js').Middleware} JSON parsing middleware.
 */
kiirus.formData = () => {
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
 * @returns {import('./Router.js').Middleware} JSON parsing middleware.
 */
kiirus.json = (options) => {
  return async (req, res, next) => {
    // Check if there is data in the request body based on the Content-Length header
    // const contentLength = (req.headers['content-length'] ?? '0') | 0
    // const [contentType] = (req.headers['content-type'] ?? '').split(';')

    // if (contentType === CONTENT_TYPE.JSON && contentLength > 0) {
    //   const bodyBuffer = []

    //   req.on('data', (chunk) => {
    //     bodyBuffer.push(chunk)
    //   })

    //   req.on('end', () => {
    //     req.body = JSON.parse(Buffer.concat(bodyBuffer).toString())

    //     next()
    //   })
    // } else {
    //   next()
    // }

    try {
      /* const body =  */await req.json()
      // console.log(body)
      console.log('req.body: %o', req.body)
      // req.body = body
    } catch (error) {
      console.log(error)
    } finally {
      next()
    }

    // req.json().then((data) => {
    //   req.body = data
    // }).catch((error) => {
    //   console.log(error)
    // }).finally(() => {
    //   next()
    // })
  }
}

/**
 * Create a middleware that parses incoming request payloads into a Buffer
 * @function
 * @param {object} [options] - Options for raw body parsing middleware.
 * @returns {import('./Router.js').Middleware} Raw body parsing middleware.
 */
kiirus.raw = (options) => {
  // Implementation here
}

/**
 * Create a router object.
 * @function
 * @returns {import('./Router.js').Router} An kiirus router instance.
 */
kiirus.Router = () => {
  return new Router()
}

/**
 * Create a middleware to serve static files.
 * @function
 * @param {string} root - The root directory from which to serve static assets.
 * @param {object} [options] - Options for static file serving middleware.
 * @returns {import('./Router.js').Middleware} Static file serving middleware.
 */
kiirus.static = (root, options) => {
  // Implementation here
}

/**
 * Create a middleware that parses text bodies.
 * @function
 * @param {object} [options] - Options for text body parsing middleware.
 * @returns {import('./Router.js').Middleware} Text body parsing middleware.
 */
kiirus.text = (options) => {
  // Implementation here
}

/**
 * Built-in middleware in kiirus.js. The main objective of this method is to
 * parse the incoming request with urlencoded payloads and is based upon the.
 *
 * This method returns the middleware that parses all the urlencoded bodies.
 *
 * @param {object} [options]
 * @returns {import('./Router.js').Middleware} x-www-form-urlencoded parsing middleware.
 */
kiirus.urlencoded = (options) => {
  return (req, res, next) => {
    // Check if there is data in the request body based on the Content-Length header
    // const contentLength = (req.headers['content-length'] ?? '0') | 0
    // const [contentType] = (req.headers['content-type'] ?? '').split(';')
    const contentLength = (req.headers.get('content-length') ?? '0') | 0
    const [contentType] = (req.headers.get('content-type') ?? '').split(';')

    if (contentType === CONTENT_TYPE.URL_ENCODED && contentLength > 0) {
      const bodyBuffer = []

      req.on('data', (chunk) => {
        bodyBuffer.push(chunk)
      })

      req.on('end', () => {
        req.body = decodeURIComponent(Buffer.concat(bodyBuffer).toString())
          .split('&')
          .reduce((params, pair) => {
            // if (options.extendex === true) {

            // }

            const [key, value] = pair.split('=')
            params[decodeURIComponent(key)] = decodeURIComponent(value)

            return params
          }, {})

        next()
      })
    } else {
      next()
    }
  }
}

export default kiirus
