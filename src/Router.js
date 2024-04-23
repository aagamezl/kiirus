import { createRouteRegEx } from './utils'

/**
 * Default options for a specific functionality.
 * @typedef {Object} Options
 * @property {boolean} [caseSensitive=false] - Determines whether the functionality is case-sensitive.
 * @property {boolean} [mergeParams=false] - Specifies whether parameters should be merged.
 * @property {boolean} [strict=false] - Indicates strict mode.
 */

/**
 * Middleware Object
 *
 * @typedef {Object} Middleware
 * @property {RegExp} path - The path for which the middleware should be applied.
 * @property {function} callback - The middleware function to be executed.
 */

/** @type {Options} */
const defaultOptions = {
  caseSensitive: false,
  mergeParams: false,
  strict: false
}

export default class Router {
  #options = {}

  /**
   * @constructor
   * @param {Options} options
   */
  constructor (options = {}) {
    /** @type {Middleware[]} */
    // this.middlewares = []

    this.#options = { ...defaultOptions, ...options }

    /** @type {Route[]} */
    this.stack = []
  }

  get (path, ...handlers) {
    this.stack.push({
      method: 'GET',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
 *
 * @param {import('./KiirusRequest')} req
 * @param {import('./KiirusResponse')} res
 * @returns {import('./KiirusRequest') | Promise<import('./KiirusRequest')>}
 */
  handle (req, res) {
    console.info('Router.handle() called')

    const routes = this.stack.filter(route => {
      return ((route.method === undefined) || (route.method === req.raw.method)) && route.path.test(req.path)
    })

    if (routes.length === 0) {
      return new Response(undefined, { statusText: 'Not Found', status: 404 })
    }

    for (let index = 0; index < routes.length; index++) {
      const route = routes[index]

      if (route.method === undefined) {
        // It's a middleware or router
        this.#handleRouteHandlers(req, res, route.handlers)
      } else {
        return this.#handleRouteHandlers(req, res, route.handlers)
      }
    }
  }

  handle2 (stack, req, res) {
    console.info('Router.handle() called')

    const routes = stack.filter(route => {
      return ((route.method === undefined) || (route.method === req.raw.method)) && route.path.test(req.path)
    })

    if (routes.length === 0) {
      return new Response(undefined, { statusText: 'Not Found', status: 404 })
    }

    for (let index = 0; index < routes.length; index++) {
      const route = routes[index]

      if (route.method === undefined) {
        // It's a middleware or router
        this.#handleRouteHandlers(req, res, route.handlers)
      } else {
        return this.#handleRouteHandlers(req, res, route.handlers)
      }
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Handler[]} handlers
   * @returns {Response | Promise<Response>}
   */
  #handleRouteHandlers (req, res, handlers) {
    let currentIndex = 0

    // Implement next function for route handler execution
    const next = () => {
      currentIndex++
      if (currentIndex < handlers.length) {
        return handlers[currentIndex](req, res, next)
      }
    }

    // Start the route handler execution
    if (handlers.length > 0) {
      if (handlers[0].name !== 'bound handle') {
        return handlers[0](req, res, next)
      }

      next()
      // return handlers[0](req, res, next)
    }
  }

  post (path, ...handlers) {
    this.stack.push({
      method: 'POST',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   *
   * @param {string|Function|Application|Router} path
   * @param {Function|Application|Router} [middleware]
   */
  use (path, middleware) {
    // TODO: midleware params must accept more than 1 function, like an array of functions Check if the first argument is a path
    this.middlewares.push({
      path: new RegExp(`${path.startsWith('/') ? path : `/${path}`}/?.*`, 'g'),
      callback: middleware
    })

    // this.stack.push({
    //   // method: '*',
    //   method: undefined,
    //   path: new RegExp(`${path.startsWith('/') ? path : `/${path}`}/?.*`, 'g'),
    //   handlers
    // })

    return this
  }
}
