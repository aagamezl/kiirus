import http from 'node:http'

import createRouter from './router.js'

console.log(http.METHODS.map(function lowerCaseMethod (method) {
  return method.toLowerCase()
}).length)

const appMiddleware = []
const routerStack = []

/**
 * Mocaccino Application Object
 *
 * @typedef {Object} Application3
 * @property {(path: string, middleware: Function) => void} all - Mounts a middleware function for all HTTP methods at a specified path.
 * @property {(path: string, middleware: Function) => void} delete - Mounts a middleware function to handle HTTP DELETE requests at a specified path.
 * @property {(setting: string) => void} disable - Disable a setting.
 * @property {(setting: string) => boolean} disabled - Check if a setting is disabled.
 * @property {(setting: string) => void} enable - Enable a setting.
 * @property {(setting: string) => boolean} enabled - Check if a setting is enabled.
 * @property {(ext: string, callback: Function) => void} engine - Register the given template engine callback as ext.
 * @property {(path: string, middleware: Function) => void} get - Mounts a middleware function to handle HTTP GET requests at a specified path.
 * @property {(port?: number | undefined, hostname?: string | undefined, backlog?: number | undefined, listeningListener?: (() => void) | undefined) => any} listen - Starts the HTTP server listening for connections.
 * @property {(middleware: Function) => void} param - Register middleware to be executed before route handling.
 * @property {(name: string) => any} path - Get the value of the app's settings when provided the name of the setting.
 * @property {(path: string, middleware: Function) => void} post - Mounts a middleware function to handle HTTP POST requests at a specified path.
 * @property {(path: string, middleware: Function) => void} patch - Mounts a middleware function to handle HTTP PATCH requests at a specified path.
 * @property {(path: string, middleware: Function) => void} put - Mounts a middleware function to handle HTTP PUT requests at a specified path.
 * @property {(view: string, options?: object, callback: Function) => void} render - Render a view with a callback responding to the client.
 * @property {(path: string) => object} route - Create a new Route object for the specified path.
 * @property {(name: string, value: any) => ExpressApplication} set - Set the value of a setting.
 * @property {(middleware: import('./router.js').Middleware | import('./router.js').Router) => void} use - Mount middleware to be executed for every request.
 */

/**
 * Mocaccino new Application Object
 *
 * @typedef {Object} Application
 * @property {import('./router.js').Router["delete"]} delete - Mounts a middleware function to handle HTTP DELETE requests at a specified path.
 * @property {import('./router.js').Router["get"]} get - Mounts a middleware function to handle HTTP GET requests at a specified path.
 * @property {import('./router.js').Router["patch"]} patch - Mounts a middleware function to handle HTTP PATCH requests at a specified path.
 * @property {import('./router.js').Router["post"]} post - Mounts a middleware function to handle HTTP POST requests at a specified path.
 * @property {import('./router.js').Router["put"]} put - Mounts a middleware function to handle HTTP PUT requests at a specified path.
 */

/**
 * Create an Express application.
 * @returns {Application} An Mocaccino application instance.
 */
const application = () => {
  /**
   * Handles incoming HTTP requests by processing them through middleware functions and
   * executing the router stack when the middleware chain is complete.
   *
   * @param {http.IncomingMessage} request - The incoming HTTP request object.
   * @param {http.ServerResponse} response - The HTTP response object to be sent back to the client.
   */
  const handleRequest = (req, res) => {
    let index = 0

    const next = () => {
      if (index >= appMiddleware.length) {
        executeRouterStack(req, res)
      } else {
        const middleware = appMiddleware[index]
        index++
        middleware(req, res, next)
      }
    }

    next()
  }

  const executeRouterStack = (request, response) => {
    let index = 0

    const next = () => {
      if (index >= routerStack.length) {
        response.statusCode = 404
        response.end('Not Found')
      } else {
        const middleware = routerStack[index]
        index++
        middleware(request, response, next)
      }
    }

    next()
  }

  const router = createRouter()

  return {
    /**
     * Application local variables.
     * @type {object}
     * @name app.locals
     * @memberOf mocaccino.Application
     */

    /**
     * The app.mountpath property holds the path pattern at which a middleware function was mounted.
     * @type {string}
     * @name app.mountpath
     * @memberOf mocaccino.Application
     */

    /**
     *:vent emitted when a middleware is mounted on the
     * @event application#mount
     * @,param {string} path - The path at which the middleware was mounted.
     * @param {Function} middleware - The middleware function.
     * @memberOf mocaccino.Application
     */

    /**
     * Mounts a middleware function for all HTTP methods at a specified path.
     * @function
     * @param {string} path - The path at which the middleware should be mounted.
     * @param {Function} middleware - The middleware function to be executed.
     */
    all: (path, middleware) => {
      // Implementation here
    },

    /**
   * Mounts a middleware function to handle HTTP DELETE requests at a specified path.
   * @function
   * @param {string} path - The path at which the middleware should be mounted.
   * @param {Function} middleware - The middleware function to be executed.
   */
    delete: (path, middleware) => {
      return router.delete(path, middleware)
    },

    /**
     * Disable a setting.
     * @function
     * @param {string} setting - The setting to be disabled.
     */
    disable: (setting) => {
      // Implementation here
    },

    /**
     * Check if a setting is disabled.
     * @function
     * @param {string} setting - The setting to check.
     * @returns {boolean} Returns true if the setting is disabled, false otherwise.
     */
    disabled: (setting) => {
      // Implementation here
    },

    /**
     * Enable a setting.
     * @function
     * @param {string} setting - The setting to be enabled.
     */
    enable: (setting) => {
      // Implementation here
    },

    /**
     * Check if a setting is enabled.
     * @function
     * @param {string} setting - The setting to check.
     * @returns {boolean} Returns true if the setting is enabled, false otherwise.
     */
    enabled: (setting) => {
      // Implementation here
    },

    /**
     * Register the given template engine callback as ext.
     * @function
     * @param {string} ext - The template engine extension.
     * @param {Function} callback - The template engine callback.
     */
    engine: (ext, callback) => {
      // Implementation here
    },

    /**
     * Mounts a middleware function to handle HTTP GET requests at a specified path.
     * @function
     * @param {string} path - The path at which the middleware should be mounted.
     * @param {Function} middleware - The middleware function to be executed.
     */
    get: (path, middleware) => {
      return router.get(path, middleware)
    },

    /**
     * Starts the HTTP server listening for connections
     *
     * @function
     * @param {number} [port] - The port to listen on.
     * @param {string} [host] - The host to listen on.
     * @param {number} [backlog] - The maximum number of pending connections.
     * @param {(() => void) | undefined} [listeningListener] - A function to be called when the server is listening.
     */
    listen: (...args) => {
      const server = http.createServer(handleRequest)

      return server.listen(...args)
    },

    /**
     * Register middleware to be executed before route handling.
     * @function
     * @param {Function} middleware - The middleware function to be executed.
     */
    param: (middleware) => {
      // Implementation here
    },

    /**
     * Get the value of the app's settings when provided the name of the setting.
     * @function
     * @param {string} name - The name of the setting to retrieve.
     * @returns {any} The value of the specified setting.
     */
    path: (name) => {
      // Implementation here
    },

    /**
     * Mounts a middleware function to handle HTTP POST requests at a specified path.
     * @function
     * @param {string} path - The path at which the middleware should be mounted.
     * @param {Function} middleware - The middleware function to be executed.
     */
    post: (path, middleware) => {
      return router.post(path, middleware)
    },

    /**
     * Mounts a middleware function to handle HTTP PATH requests at a specified path.
     * @function
     * @param {string} path - The path at which the middleware should be mounted.
     * @param {Function} middleware - The middleware function to be executed.
     */
    patch: (path, middleware) => {
      return router.patch(path, middleware)
    },

    /**
     * Mounts a middleware function to handle HTTP PUT requests at a specified path.
     * @function
     * @param {string} path - The path at which the middleware should be mounted.
     * @param {Function} middleware - The middleware function to be executed.
     */
    put: (path, middleware) => {
      return router.put(path, middleware)
    },

    /**
     * Render a view with a callback responding to the client.
     * @function
     * @param {string} view - The name of the view to render.
     * @param {object} [options] - Options for rendering.
     * @param {Function} callback - The callback function to respond to the client.
     */
    render: (view, options, callback) => {
      // Implementation here
    },

    /**
     * Create a new Route object for the specified path.
     * @function
     * @param {string} path - The path pattern for the route.
     * @returns {object} A new Route instance.
     */
    route: (path) => {
      // Implementation here
    },

    /**
     * Set the value of a setting.
     * @function
     * @param {string} name - The name of the setting to set.
     * @param {any} value - The value to set for the setting.
     * @returns {object} The Express application instance.
     */
    set: (name, value) => {
      // Implementation here
    },

    /**
     *:ount middleware to be executed for every request to the
     * @function
     * @param {import('./router.js').Middleware | import('./router.js').Router} middleware - The middleware function to be executed.
     */
    use: (middleware) => {
      if (typeof middleware === 'function') {
        appMiddleware.push(middleware)
      } else if (middleware && middleware.handleRequest) {
        routerStack.push(middleware.handleRequest)
      } else {
        throw new Error('Invalid middleware')
      }
    }
  }
}

export default application
