import { serve } from 'bun'
import { EventEmitter } from 'bun:events'

import Router from './Router'
import { getRequestPath } from './utils'
import KiirusRequest from './KiirusRequest'

export default class Application extends EventEmitter {
  constructor () {
    super()

    this.router = new Router()

    this.#defaultConfiguration()
  }

  #defaultConfiguration () {}

  /**
   * Manage the Bun Server request handler mechanism
   *
   * @instance Application
   * @param {import('./KiirusRequest')} req
   * @returns {import('./KiirusResponse') | Promise<import('./KiirusResponse')>}
   */
  handle (req) {
    // Implement next function for middleware execution
    const next = (req, res) => {
      currentIndex++

      if (currentIndex < this.router.middlewares.length) {
        const middleware = this.router.middlewares[currentIndex]

        if (middleware.path.test(path)) {
          return middleware.callback(req, res, next)
        }

        return next(req, res)
      } else {
        // If no more middleware, proceed to route handling
        return this.router.handle(req, res)
      }
    }

    const path = getRequestPath(req)
    const request = new KiirusRequest(req, path)
    let currentIndex = 0

    // Start the middleware execution
    if (this.router.middlewares.length > 0) {
      for (let index = 0; index < this.router.middlewares.length; index++) {
        const middleware = this.router.middlewares[index]
        middleware.path.lastIndex = 0 // to avoid missing the next test

        if (middleware.path.test(path)) {
          return middleware.callback(request, Response, next)
        }
      }
    }

    return this.router.handle(request, Response)
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
   *
   * @param {string|Function|Application|Router} path
   * @param {Function|Application|Router} [middleware]
   */
  use (path, middleware) {
    if (!path && !middleware) {
      throw new TypeError('app.use() requires a middleware function')
    }

    /* TODO: midleware params must accept more than 1 function, like an array of functions */
    let mountpath

    // Check if the first argument is a path
    if (typeof path === 'string') {
      mountpath = path.startsWith('/') ? path : `/${path}`
      path = mountpath
    } else {
      mountpath = '/'
      middleware = path
      // path = /\/.*/g
      path = mountpath
    }

    middleware.mountpath = mountpath
    middleware.parent = this

    // Check if the middleware is a simple middleware or an app or router (have
    // a handle function)
    if (typeof middleware === 'function') {
      this.router.use(path, middleware)
    } else if (middleware?.handle) {
      this.router.use(path, middleware.handle.bind(middleware))
    } else {
      throw new Error('Invalid middleware')
    }

    return this
  }
}
