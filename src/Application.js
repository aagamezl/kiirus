import Router from './Router'

export default class Application {
  #router = new Router()

  constructor () {
    this.middleware = []
  }

  // get (path, ...handlers) {
  //   this.routes.push({ method: 'GET', path, handlers })
  // }

  // post (path, ...handlers) {
  //   this.routes.push({ method: 'POST', path, handlers })
  // }

  listen (port, hostname, callback, development, error, tls, maxRequestBodySize, lowMemoryMode) {
    // Check if the 'host' parameter is provided
    if (typeof hostname === 'function') {
      callback = hostname
      hostname = '0.0.0.0'
    }

    // Check if the 'callback' parameter is provided
    if (typeof callback !== 'function') {
      callback = undefined
    }

    callback = callback ?? (() => { }) // Default callback is an empty function

    callback()

    Bun.serve({
      port, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
      hostname, // defaults to "0.0.0.0"
      fetch: this.#handleRequest.bind(this),
      development,
      error,
      tls,
      maxRequestBodySize,
      lowMemoryMode
    })
  }

  #handleRequest (req, res) {
    let currentIndex = 0

    // Implement next function for middleware execution
    const next = () => {
      currentIndex++
      if (currentIndex < this.middleware.length) {
        return this.middleware[currentIndex](req, Response, next)
      } else {
        // If no more middleware, proceed to route handling
        return this.#router.handle(req, Response)
      }
    }

    // Start the middleware execution
    if (this.middleware.length > 0) {
      return this.middleware[0](req, res, next)
    } else {
      // If no middleware, directly handle routes
      return this.#router.handleRoutes(req, res)
    }
  }

  use (middleware) {
    if (middleware.handle) {
      // Use method is used with a router object like parameter
      this.middleware.push(middleware.handle.bind(middleware))
    } else {
      this.middleware.push(middleware)
    }
  }
}
