import application from './application.js'
import router from './router.js'

/**
 * Create an mocaccino application.
 * @typedef {object} NumberLike
 * - `json(options)`: Create a middleware that parses JSON bodies.
 * - `raw(options)`: Create a middleware that parses raw bodies.
 * - `Router()`: Create a router object.
 * - `static(root, options)`: Create a middleware to serve static files.
 * - `text(options)`: Create a middleware that parses text bodies.
 * - `urlencoded(options)`: Create a middleware that parses URL-encoded bodies.
 */
const mocaccino = () => {
  return {
    ...application(),
    /**
     * Create a middleware that parses JSON bodies.
     * @function
     * @param {object} [options] - Options for JSON parsing middleware.
     * @returns {function} JSON parsing middleware.
     */
    // json: (options) => {
    //   // Implementation here
    // },

    /**
     * Create a middleware that parses raw bodies.
     * @function
     * @param {object} [options] - Options for raw body parsing middleware.
     * @returns {function} Raw body parsing middleware.
     */
    raw: (options) => {
      // Implementation here
    },

    /**
     * Create a router object.
     * @function
     * @returns {import('./router').router} An Mocaccino router instance.
     */
    Router: () => {
      return router()
    },

    /**
     * Create a middleware to serve static files.
     * @function
     * @param {string} root - The root directory from which to serve static assets.
     * @param {object} [options] - Options for static file serving middleware.
     * @returns {function} Static file serving middleware.
     */
    static: (root, options) => {
      // Implementation here
    },

    /**
     * Create a middleware that parses text bodies.
     * @function
     * @param {object} [options] - Options for text body parsing middleware.
     * @returns {function} Text body parsing middleware.
     */
    text: (options) => {
      // Implementation here
    },

    /**
     * Create a middleware that parses URL-encoded bodies.
     * @function
     * @param {object} [options] - Options for URL-encoded body parsing middleware.
     * @returns {function} URL-encoded body parsing middleware.
     */
    urlencoded: (options) => {
      // Implementation here
    }
  }
}

/**
 * Create a middleware that parses JSON bodies.
 * @function
 * @param {object} [options] - Options for JSON parsing middleware.
 * @returns {function} JSON parsing middleware.
 */
mocaccino.json = () => {
  return (req, res, next) => {
    // Check if there is data in the request body based on the Content-Length header
    const contentLength = (req.headers['content-length'] ?? '0') | 0

    if (contentLength > 0) {
      const bodyBuffer = []

      req.on('data', (chunk) => {
        bodyBuffer.push(chunk)
      })

      req.on('end', () => {
        if (req.headers['content-type'] !== undefined) {
          const [contentType] = req.headers['content-type'].split(';')

          switch (contentType) {
            case 'application/json':
              req.body = JSON.parse(Buffer.concat(bodyBuffer).toString())

            // case 'application/x-www-form-urlencoded':
            //   return callback(urlEncoded(Buffer.concat(bodyBuffer)))

            // case 'multipart/form-data':
            //   return callback(formData(Buffer.concat(bodyBuffer), getBoundary(req.headers['content-type'])))

            // default:
            //   return callback(Buffer.concat(bodyBuffer))
          }

          next()
        }

        // return callback(Buffer.concat(bodyBuffer))
      })

      // Create a Transform stream to accumulate the request body
      // const requestBodyStream = new Transform({
      //   transform (chunk, encoding, callback) {
      //     this.push(chunk)
      //     callback()
      //   }
      // })

      // // Read and parse the request body
      // req.pipe(requestBodyStream)

      // requestBodyStream.on('end', () => {
      //   req.body = requestBodyStream.read()

      //   // Start executing middleware chain
      //   next()
      // })
    } else {
      next()
    }
  }
}

export default mocaccino

// import router from './router.js'

// const mocaccino = () => {
//   const appMiddleware = []
//   const routerStack = []

//   /**
//    *
//    * @param {Function} middleware
//    * @returns {void}
//    */
//   const use = (middleware) => {
//     if (typeof middleware === 'function') {
//       appMiddleware.push(middleware)
//     } else if (middleware && middleware.handleRequest) {
//       // routerStack.push(middleware.handleRequest.bind(middleware))
//       routerStack.push(middleware.handleRequest)
//     } else {
//       throw new Error('Invalid middleware')
//     }
//   }

//   /**
// /**
//  * Handles incoming HTTP requests by processing them through middleware functions and
//  * executing the router stack when the middleware chain is complete.
//  *
//  * @param {http.IncomingMessage} request - The incoming HTTP request object.
//  * @param {http.ServerResponse} response - The HTTP response object to be sent back to the client.
//  */
//   const handleRequest = (request, response) => {
//     // const { method, url } = request

//     let index = 0
//     const next = () => {
//       if (index >= appMiddleware.length) {
//         executeRouterStack(request, response)
//       } else {
//         const middleware = appMiddleware[index]
//         index++
//         middleware(request, response, next)
//       }
//     }

//     next()
//   }

//   const executeRouterStack = (request, response) => {
//     let index = 0
//     const next = () => {
//       if (index >= routerStack.length) {
//         response.statusCode = 404
//         response.end('Not Found')
//       } else {
//         const middleware = routerStack[index]
//         index++
//         middleware(request, response, next)
//       }
//     }

//     next()
//   }

//   /**
//    *
//    * @param {number} port
//    */
//   const listen = (...args) => {
//     const server = http.createServer(handleRequest)
//     // server.listen(port, () => {
//     //   console.log(`Server is listening on port ${port}`)
//     // })

//     return server.listen(...args)
//   }

//   return { use, listen, router }
// }

// export default mocaccino
