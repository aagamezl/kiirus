// import KiirusRequest from './Request.js'
import Router from './Router.js'

class Application {
  // #appMiddleware = []
  // #routerStack = []

  static router = new Router()
  static appMiddleware = []
  static routerStack = []

  constructor () {
    /**
     * Application local variables.
     * @type {object}
     * @name app.locals
     * @memberOf mocaccino.Application
     */
    this.locals = Object.create(null)

    /**
     * The app.mountpath property holds the path pattern at which a middleware function was mounted.
     * @type {string}
     * @name app.mountpath
     * @memberOf mocaccino.Application
     */
    this.mountpath = '/'

    // this.appMiddleware = []
    // this.routerStack = []
  }

  /**
   * Mounts a middleware function for all HTTP methods at a specified path.
   * @function
   * @param {string} path - The path at which the middleware should be mounted.
   * @param {Function} middleware - The middleware function to be executed.
   */
  all (path, middleware) {
    // Implementation here
  }

  /**
  * Mounts a middleware function to handle HTTP DELETE requests at a specified path.
  * @function
  * @param {string} path - The path at which the middleware should be mounted.
  * @param {Function} middleware - The middleware function to be executed.
  */
  delete (path, middleware) {
    return Application.router.delete(path, middleware)
  }

  /**
   * Disable a setting.
   * @function
   * @param {string} setting - The setting to be disabled.
   */
  disable (setting) {
    // Implementation here
  }

  /**
   * Check if a setting is disabled.
   * @function
   * @param {string} setting - The setting to check.
   * @returns {boolean} Returns true if the setting is disabled, false otherwise.
   */
  disabled (setting) {
    // Implementation here
  }

  /**
   * Enable a setting.
   * @function
   * @param {string} setting - The setting to be enabled.
   */
  enable (setting) {
    // Implementation here
  }

  /**
   * Check if a setting is enabled.
   * @function
   * @param {string} setting - The setting to check.
   * @returns {boolean} Returns true if the setting is enabled, false otherwise.
   */
  enabled (setting) {
    // Implementation here
  }

  /**
   * Register the given template engine callback as ext.
   * @function
   * @param {string} ext - The template engine extension.
   * @param {Function} callback - The template engine callback.
   */
  engine (ext, callback) {
    // Implementation here
  }

  /**
   * Mounts a middleware function to handle HTTP GET requests at a specified path.
   * @function
   * @param {string} path - The path at which the middleware should be mounted.
   * @param {Function} middleware - The middleware function to be executed.
   */
  get (path, middleware) {
    return Application.router.get(path, middleware)
  }

  /**
   * Starts the HTTP server listening for connections
   *
   * @function
   * @param {number} [port] - The port to listen on.
   * @param {string} [hostname] - The host to listen on.
   * @param {(() => void) | undefined} [callback] - A function to be called when the server is listening.
   * @param {boolean} [development] - The maximum number of pending connections.
   * @param {(error: Error) => Response | Promise<Response>} [error] - The maximum number of pending connections.
   */
  listen (port, hostname, callback, development, error, tls, maxRequestBodySize, lowMemoryMode) {
    // const server = http.createServer(handleRequest)

    // return server.listen(...args)

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
      fetch: Application.handleRequest,
      development,
      error,
      tls,
      maxRequestBodySize,
      lowMemoryMode
    })
  }

  /**
   * Register middleware to be executed before route handling.
   * @function
   * @param {Function} middleware - The middleware function to be executed.
   */
  param (middleware) {
    // Implementation here
  }

  /**
   * Get the canonical path of the app
   * @function
   * @returns {string} The value of the specified setting.
   */
  path () {
    return this.parent
      ? this.parent.path() + this.mountpath
      : ''
  }

  /**
   * Mounts a middleware function to handle HTTP POST requests at a specified path.
   * @function
   * @param {string} path - The path at which the middleware should be mounted.
   * @param {Function} middleware - The middleware function to be executed.
   */
  post (path, middleware) {
    return Application.router.post(path, middleware)
  }

  /**
   * Mounts a middleware function to handle HTTP PUT requests at a specified path.
   * @function
   * @param {string} path - The path at which the middleware should be mounted.
   * @param {Function} middleware - The middleware function to be executed.
   */
  put (path, middleware) {
    return Application.router.put(path, middleware)
  }

  /**
   * Render a view with a callback responding to the client.
   * @function
   * @param {string} view - The name of the view to render.
   * @param {object} [options] - Options for rendering.
   * @param {Function} callback - The callback function to respond to the client.
   */
  render (view, options, callback) {
    // Implementation here
  }

  /**
   * Create a new Route object for the specified path.
   * @function
   * @param {string} path - The path pattern for the route.
   * @returns {object} A new Route instance.
   */
  route (path) {
    // Implementation here
  }

  /**
   * Set the value of a setting.
   * @function
   * @param {string} name - The name of the setting to set.
   * @param {any} value - The value to set for the setting.
   * @returns {object} The Express application instance.
   */
  set (name, value) {
    // Implementation here
  }

  /**
   * Mounts a middleware function to handle HTTP PATH requests at a specified path.
   * @function
   * @param {string} path - The path at which the middleware should be mounted.
   * @param {Function} middleware - The middleware function to be executed.
   */
  patch (path, middleware) {
    return Application.router.patch(path, middleware)
  }

  /**
   * Mounts middleware to be executed for every request to the
   * @function
   * @param {import('./Router.js').Middleware[] | import('./Router.js').Router} [middleware] - The middleware function to be executed.
   */
  use (...args) {
    let mountpath
    let path
    let middlewares

    // Check if the first argument is a path
    if (typeof args[0] === 'string') {
      mountpath = args[0].at(0) === '/' ? args[0] : `/${args[0]}`
      path = new RegExp(`${mountpath}/?.*`, 'g')
      middlewares = args.slice(1)
    } else {
      mountpath = '/'
      path = /\/.*/g
      middlewares = args.flat()
    }

    middlewares.forEach((callback) => {
      callback.mountpath = mountpath
      callback.parent = this

      if (typeof callback === 'function') {
        Application.appMiddleware.push({ path, callback })
      } else if (callback && callback.handleRequest) {
        Application.routerStack.push({ path, callback: callback.handleRequest })
      } else {
        throw new Error('Invalid middleware')
      }
    })
  }

  static executeRouterStack (request, response) {
    let index = 0

    const next = () => {
      if (index >= Application.routerStack.length) {
        return new Response(undefined, { statusText: 'Not Found', status: 404 })
      } else {
        const middleware = Application.routerStack[index]
        index++
        // Check if the  mounted middleware match the path
        if (middleware.path.test(request.url)) {
          return middleware.callback(request, response, next)
        }
      }
    }

    return next()
  }

  /**
   * Handles incoming HTTP requests by processing them through middleware functions and
   * executing the router stack when the middleware chain is complete.
   *
   * @param {http.IncomingMessage} request - The incoming HTTP request object.
   * @param {import('bun').Server} server - The HTTP response object to be sent back to the client.
   */
  static handleRequest (request, response) {
    let index = 0

    const next = () => {
      if (index >= Application.appMiddleware.length) {
        return Application.executeRouterStack(request, Response)
      } else {
        const middleware = Application.appMiddleware[index]
        index++

        // Check if the  mounted middleware match the path
        if (middleware.path.test(request.url)) {
          return middleware.callback(request, response, next)
          // return middleware.callback(request, Response, next)
          // return middleware.callback(new KiirusRequest(request), Response, next)
        }
      }
    }

    return next()
  }
}

export default Application
