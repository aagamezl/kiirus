import { createRouteRegEx } from './utils'

/**
 * Default options for a specific functionality.
 * @typedef {Object} Options
 * @property {boolean} [caseSensitive=false] - Determines whether the functionality is case-sensitive.
 * @property {boolean} [mergeParams=false] - Specifies whether parameters should be merged.
 * @property {boolean} [strict=false] - Indicates strict mode.
 */

/** @type {Options} */
const defaultOptions = {
  caseSensitive: false,
  mergeParams: false,
  strict: false
}

/**
 * A middleware function that takes an Express.js request, response, and next function.
 * @callback Handler
 * @param {Request} req - The Fetch request object.
 * @param {Response} res - The Fetch response object.
 * @param {Function} next - The next function to call in the middleware chain.
 * @returns {Response | Promise<Response>}
 */

/**
 * Route configuration object for a specific route.
 * @typedef {Object} Route
 * @property {string} method - The HTTP method for the route (e.g., 'ACL', 'GET', 'POST').
 * @property {RegExp} path - Regular expression representing the route path.
 * @property {Handler[]} handlers - An array of handler functions for the route.
 */

export default class Router {
  #options

  /** @type {Route[]} */
  static routes = []

  /**
   * @constructor
   * @param {Options} options
   */
  constructor (options = {}) {
    this.#options = { ...defaultOptions, ...options }
  }

  /**
   *
   * @param {http.IncomingMessage} req
   * @param {Response} res
   * @returns {Response | Promise<Response>}
   */
  handle (req, res) {
    // // Implement route handling
    // const route = Router.routes.find(route => {
    //   // return route.method === req.method && route.path.test(req.url.split(req.headers.get('host')).pop())
    //   // return ((route.method === undefined) || (route.method === req.method)) && route.path.test(getRequestPath(req))
    //   return ((route.method === undefined) || (route.method === req.method)) && route.pattern.matcher(getRequestPath(req))
    // })

    // console.log('route: %o', route)

    // if (!route) {
    //   return new Response(undefined, { statusText: 'Not Found', status: 404 })
    // }

    // return this.#handleRouteHandlers(route.handlers, req, res)
    // const requestPath = getRequestPath(req.raw)

    const routes = Router.routes.filter(route => {
      // const isMatch = route.path.test(getRequestPath(req))
      // route.path.lastIndex = 0
      // return ((route.method === undefined) || (route.method === req.raw.method)) && route.path.test(requestPath)
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
      return handlers[0](req, res, next)
    }
  }

  /**
   * Add a new route for handling HTTP acl requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  acl (path, ...handlers) {
    Router.routes.push({
      method: 'ACL',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP bind requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  bind (path, ...handlers) {
    Router.routes.push({
      method: 'BIND',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP checkout requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  checkout (path, ...handlers) {
    Router.routes.push({
      method: 'CHECKOUT',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP connect requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  connect (path, ...handlers) {
    Router.routes.push({
      method: 'CONNECT',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP copy requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  copy (path, ...handlers) {
    Router.routes.push({
      method: 'COPY',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP delete requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  delete (path, ...handlers) {
    Router.routes.push({
      method: 'DELETE',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP GET requests.
   *
   * @param {string} path - The route path.
   * @param {...Function} handlers - One or more middleware functions to handle the route.
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
    Router.routes.push({
      method: 'GET',
      // pattern: {
      //   path,
      //   matcher: createRouteRegEx(path, this.#options)
      // },
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP head requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  head (path, ...handlers) {
    Router.routes.push({
      method: 'HEAD',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP link requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  link (path, ...handlers) {
    Router.routes.push({
      method: 'LINK',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP lock requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  lock (path, ...handlers) {
    Router.routes.push({
      method: 'LOCK',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP msearch requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  msearch (path, ...handlers) {
    Router.routes.push({
      method: 'M-SEARCH',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP merge requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  merge (path, ...handlers) {
    Router.routes.push({
      method: 'MERGE',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP mkactivity requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  mkactivity (path, ...handlers) {
    Router.routes.push({
      method: 'MKACTIVITY',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP mkcalendar requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  mkcalendar (path, ...handlers) {
    Router.routes.push({
      method: 'MKCALENDAR',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP mkcol requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  mkcol (path, ...handlers) {
    Router.routes.push({
      method: 'MKCOL',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP move requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  move (path, ...handlers) {
    Router.routes.push({
      method: 'MOVE',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP notify requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  notify (path, ...handlers) {
    Router.routes.push({
      method: 'NOTIFY',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP options requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  options (path, ...handlers) {
    Router.routes.push({
      method: 'OPTIONS',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP patch requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  patch (path, ...handlers) {
    Router.routes.push({
      method: 'PATCH',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP post requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  post (path, ...handlers) {
    Router.routes.push({
      method: 'POST',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP propfind requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  propfind (path, ...handlers) {
    Router.routes.push({
      method: 'PROPFIND',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP proppatch requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  proppatch (path, ...handlers) {
    Router.routes.push({
      method: 'PROPPATCH',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP purge requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  purge (path, ...handlers) {
    Router.routes.push({
      method: 'PURGE',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP put requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  put (path, ...handlers) {
    Router.routes.push({
      method: 'PUT',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP rebind requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  rebind (path, ...handlers) {
    Router.routes.push({
      method: 'REBIND',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP report requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  report (path, ...handlers) {
    Router.routes.push({
      method: 'REPORT',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP search requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  search (path, ...handlers) {
    Router.routes.push({
      method: 'SEARCH',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP source requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  source (path, ...handlers) {
    Router.routes.push({
      method: 'SOURCE',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP subscribe requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  subscribe (path, ...handlers) {
    Router.routes.push({
      method: 'SUBSCRIBE',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP trace requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  trace (path, ...handlers) {
    Router.routes.push({
      method: 'TRACE',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP unbind requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  unbind (path, ...handlers) {
    Router.routes.push({
      method: 'UNBIND',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP unlink requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  unlink (path, ...handlers) {
    Router.routes.push({
      method: 'UNLINK',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP unlock requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  unlock (path, ...handlers) {
    Router.routes.push({
      method: 'UNLOCK',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   * Add a new route for handling HTTP unsubscribe requests.
   *
   * @param {string} path
   * @param  {Handler[]} handlers
   * @returns
   */
  unsubscribe (path, ...handlers) {
    Router.routes.push({
      method: 'UNSUBSCRIBE',
      path: createRouteRegEx(path, this.#options),
      handlers
    })

    return this
  }

  /**
   *
   * @param {*} path
   * @param  {...any} handlers
   */
  use (path, middleware) {
    /* TODO: midleware params must accept more than 1 function, like an array of functions */
    // Check if the first argument is a path
    if (typeof path === 'string') {
      path = new RegExp(`${path.startsWith('/') ? path : `/${path}`}/?.*`, 'g')
    } else {
      middleware = path
      path = /\/.*/g
    }

    Router.routes.push({
      method: undefined,
      path,
      handlers: [middleware]
    })

    return this
  }
}
