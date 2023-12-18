import { serve } from 'bun'
import { EventEmitter } from 'bun:events'

import Router from './Router.js'
import { getRequestPath } from './utils'
import ClientRequest from './ClientRequest.js'

/**
 * Middleware Object
 *
 * @typedef {Object} Middleware
 * @property {RegExp} path - The path for which the middleware should be applied.
 * @property {function} callback - The middleware function to be executed.
 */

export default class Application extends EventEmitter {
  constructor () {
    super()

    this.cache = {}

    this.engines = {}

    /**
     * Application local variables.
     * @type {object}
     * @name app.locals
     * @memberOf kiirus.Application
     */
    this.locals = Object.create(null)

    /**
     * The app.mountpath property holds the path pattern at which a middleware function was mounted.
     * @type {string}
     * @name app.mountpath
     * @memberOf kiirus.Application
     */
    this.mountpath = '/'

    /** @type {Middleware[]} */
    this.middlewares = []

    /** @type {Application} */
    this.parent = undefined

    this.router = new Router()

    this.settings = {}

    this.#defaultConfiguration()
  }

  #defaultConfiguration () {
    const env = Bun.env.NODE_ENV || 'development'

    // default settings
    this.enable('x-powered-by')
    this.set('etag', 'weak')
    this.set('env', env)
    this.set('query parser', 'extended')
    this.set('subdomain offset', 2)
    this.set('trust proxy', false)

    if (env === 'production') {
      this.enable('view cache')
    }
  }

  /**
   *
   * @param {string | number} [port]
   * @param {string} [hostname]
   * @param {Function} [callback]
   * @param {boolean} [development]
   * @param {Function} [error]
   * @param {object} [tls]
   * @param {number} [maxRequestBodySize]
   * @param {boolean} [lowMemoryMode]
   */
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

    setImmediate(callback)

    const server = serve({
      port, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
      hostname, // defaults to "0.0.0.0"
      fetch: this.handle.bind(this),
      development,
      error,
      tls,
      maxRequestBodySize,
      lowMemoryMode
    })

    server.close = server.stop

    return server
  }

  /**
   * Manage the Bun Server request handler mechanism
   *
   * @instance Application
   * @param {Request} req
   * @returns {Response | Promise<Response>}
   */
  handle (req) {
    let currentIndex = 0
    const path = getRequestPath(req)
    const request = new ClientRequest(req, path)

    // Implement next function for middleware execution
    const next = (req, res) => {
      currentIndex++

      if (currentIndex < this.middlewares.length) {
        const middleware = this.middlewares[currentIndex]

        if (middleware.path.test(path)) {
          // return middleware.callback(req, Response, next)
          // return middleware.callback(request, Response, next) // 2023-12-17
          return middleware.callback(req, res, next)
        }

        return next(req, res)

        // return this.middlewares[currentIndex](req, Response, next)
      } else {
        // If no more middleware, proceed to route handling
        // return this.router.handle(req, Response)
        // return this.router.handle(request, Response) // 2023-12-17
        return this.router.handle(req, res)
      }
    }

    // Start the middleware execution
    if (this.middlewares.length > 0) {
      // return this.middlewares[0](req, res, next)
      for (let index = 0; index < this.middlewares.length; index++) {
        const middleware = this.middlewares[index]
        middleware.path.lastIndex = 0 // to avoid missing the next test

        if (middleware.path.test(path)) {
          // return middleware.callback(req, Response, next)
          return middleware.callback(request, Response, next)
        }
      }

      // If no middleware match the request, directly handle routes
      // return this.router.handle(req, Response)
      return this.router.handle(request, Response)
    } else {
      // If no middleware, directly handle routes
      // return this.router.handle(req, Response)
      return this.router.handle(request, Response)
    }
  }

  /**
   * Add a new route for handling HTTP acl requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  acl (path, ...handlers) {
    return this.router.acl(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP bind requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  bind (path, ...handlers) {
    return this.router.bind(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP checkout requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  checkout (path, ...handlers) {
    return this.router.checkout(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP connect requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  connect (path, ...handlers) {
    return this.router.connect(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP copy requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  copy (path, ...handlers) {
    return this.router.copy(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP delete requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  delete (path, ...handlers) {
    return this.router.delete(path, ...handlers)
  }

  /**
   * Enable `setting`.
   *
   * @param {string} setting
   * @return {this} for chaining
   */
  enable (setting) {
    return this.set(setting, true)
  }

  enabled (setting) {
    return Boolean(this.set(setting))
  }

  /**
   * Add a new route for handling HTTP GET requests.
   *
   * @param {string} path - The route path.
   * @param {Function[]} [handlers] - One or more middleware functions to handle the route.
   * @returns {void}
   * @throws {TypeError} Will throw an error if the path is not a string or if any of the handlers are not functions.
   *
   * @example
   * // Define a simple route with a single handler
   * app.get('/example', (req, res) => {
   *   res.send('Hello, World!');
   * });
   *
   * // Define a route with multiple handlers
   * const middleware1 = (req, res, next) => { /* ... * / };
   * const middleware2 = (req, res, next) => { /* ... * / };
   * app.get('/example', middleware1, middleware2, (req, res) => {
   *   res.send('Hello, World!');
   * });
   */
  get (path, ...handlers) {
    if (handlers.length === 0) {
      // app.get(setting)
      return this.set(path)
    }

    return this.router.get(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP head requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  head (path, ...handlers) {
    return this.router.head(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP link requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  link (path, ...handlers) {
    return this.router.link(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP lock requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  lock (path, ...handlers) {
    return this.router.lock(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP msearch requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  msearch (path, ...handlers) {
    return this.router.msearch(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP merge requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  merge (path, ...handlers) {
    return this.router.merge(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP mkactivity requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  mkactivity (path, ...handlers) {
    return this.router.mkactivity(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP mkcalendar requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  mkcalendar (path, ...handlers) {
    return this.router.mkcalendar(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP mkcol requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  mkcol (path, ...handlers) {
    return this.router.mkcol(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP move requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  move (path, ...handlers) {
    return this.router.move(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP notify requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  notify (path, ...handlers) {
    return this.router.notify(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP options requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  options (path, ...handlers) {
    return this.router.options(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP patch requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  patch (path, ...handlers) {
    return this.router.patch(path, ...handlers)
  }

  /**
   * Register middleware to be executed before route handling.
   * @param {string | string[]} name - The middleware function to be executed.
   * @param {Function} callback - The middleware function to be executed.
   */
  param (name, callback) {
    // Implementation here
  }

  /**
   * Add a new route for handling HTTP post requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  post (path, ...handlers) {
    return this.router.post(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP propfind requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  propfind (path, ...handlers) {
    return this.router.propfind(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP proppatch requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  proppatch (path, ...handlers) {
    return this.router.proppatch(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP purge requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  purge (path, ...handlers) {
    return this.router.purge(path, ...handlers)
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
   * Add a new route for handling HTTP put requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  put (path, ...handlers) {
    return this.router.put(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP rebind requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  rebind (path, ...handlers) {
    return this.router.rebind(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP report requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  report (path, ...handlers) {
    return this.router.report(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP search requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  search (path, ...handlers) {
    return this.router.search(path, ...handlers)
  }

  /**
   *
   * @param {string | Object.<string, any>} setting
   * @param {any} [val]
   * @returns {Application}
   */
  set (setting, val) {
    if (val === undefined) {
      // app.get(setting)
      let settings = this.settings

      while (settings && settings !== Object.prototype) {
        if (hasOwnProperty.call(settings, setting)) {
          return settings[setting]
        }

        settings = Object.getPrototypeOf(settings)
      }

      return undefined
    }

    // set value
    this.settings[setting] = val

    // TODO: Implement this code
    // trigger matched settings
    // switch (setting) {
    //   case 'etag':
    //     this.set('etag fn', compileETag(val))
    //     break
    //   case 'query parser':
    //     this.set('query parser fn', compileQueryParser(val))
    //     break
    //   case 'trust proxy':
    //     this.set('trust proxy fn', compileTrust(val))

    //     // trust proxy inherit back-compat
    //     Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
    //       configurable: true,
    //       value: false
    //     })

    //     break
    // }

    return this
  }

  /**
   * Add a new route for handling HTTP source requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  source (path, ...handlers) {
    return this.router.source(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP subscribe requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  subscribe (path, ...handlers) {
    return this.router.subscribe(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP trace requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  trace (path, ...handlers) {
    return this.router.trace(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP unbind requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  unbind (path, ...handlers) {
    return this.router.unbind(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP unlink requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  unlink (path, ...handlers) {
    return this.router.unlink(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP unlock requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  unlock (path, ...handlers) {
    return this.router.unlock(path, ...handlers)
  }

  /**
   * Add a new route for handling HTTP unsubscribe requests.
   *
   * @param {string} path
   * @param  {import('./Router.js').Middleware[]} handlers
   * @returns
   */
  unsubscribe (path, ...handlers) {
    return this.router.unsubscribe(path, ...handlers)
  }

  /**
   *
   * @param {string|Function|Application|Router} path
   * @param {Function|Application|Router} [middleware]
   */
  use (path, middleware) {
    /* TODO: midleware params must accept more than 1 function, like an array of functions */
    let mountpath

    // Check if the first argument is a path
    if (typeof path === 'string') {
      mountpath = path.startsWith('/') ? path : `/${path}`
      path = new RegExp(`${mountpath}/?.*`, 'g')
      // path = createRouteRegEx(mountpath)
    } else {
      mountpath = '/'
      middleware = path
      path = /\/.*/g
    }

    middleware.mountpath = mountpath
    middleware.parent = this

    // Check if the middleware is a simple middleware or an app or router (have
    // a handle function)
    if (typeof middleware === 'function') {
      this.middlewares.push({
        path,
        callback: middleware
      })
    } else if (middleware?.handle) {
      this.middlewares.push({
        path,
        callback: middleware.handle.bind(middleware)
      })
    } else {
      throw new Error('Invalid middleware')
    }
  }
}
