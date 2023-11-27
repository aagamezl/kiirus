import createRouteRegEx from './utils/createRouteRegEx.js'

export default class Router {
  constructor () {
    this.middleware = []
    this.routes = []
  }

  handle (req, res) {
    // Implement route handling
    const route = this.routes.find(route => {
      return route.method === req.method && route.path.test(req.url.split(req.headers.get('host')).pop())
    })

    if (!route) {
      return new Response(undefined, { statusText: 'Not Found', status: 404 })
    }

    return this.#handleRouteHandlers(route.handlers, req, res)
  }

  #handleRouteHandlers (handlers, req, res) {
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
    this.routes.push({
      method: 'GET',
      path: createRouteRegEx(path),
      handlers
    })

    return this
  }

  post (path, ...handlers) {
    this.routes.push({
      method: 'POST',
      path: createRouteRegEx(path),
      handlers
    })

    return this
  }
}
