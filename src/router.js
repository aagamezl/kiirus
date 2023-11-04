import Response from './response.js'

/**
 * A middleware function that takes an Express.js request, response, and next function.
 * @callback Middleware
 * @param {import('./request.js').Request} req - The Express.js request object.
 * @param {import('./response.js').Response} res - The Express.js response object.
 * @param {Function} next - The next function to call in the middleware chain.
 * @returns {void}
 */

/**
 * Express-like Router object.
 * @typedef {Object} Router
 * @property {(req: Request, res: Response, next: Middleware) => void} handleRequest - Handles incoming HTTP requests.
 * @property {(path: string, ...handlers: Middleware[]) => Router} delete - Mounts a middleware function to handle HTTP DELETE requests at a specified path.
 * @property {(path: string, ...handlers: Middleware[]) => Router} get - Mounts a middleware function to handle HTTP GET requests at a specified path.
 * @property {(path: string, ...handlers: Middleware[]) => Router} patch - Mounts a middleware function to handle HTTP PATCH requests at a specified path.
 * @property {(path: string, ...handlers: Middleware[]) => Router} post - Mounts a middleware function to handle HTTP POST requests at a specified path.
 * @property {(path: string, ...handlers: Middleware[]) => Router} put - Mounts a middleware function to handle HTTP PUT requests at a specified path.
 * @property {(method: string, path: string, ...handlers: function[]) => Router} use - Mounts a middleware function to handle HTTP requests with a specified method and path.
 */

const createRouter = () => {
  const routes = []

  const router = {
    handleRequest: (req, res, next) => {
      const { method, url } = req

      // Find route matching the request
      // TODO: Change this .find to a traditional for
      const route = routes.find(route => {
        const routeRegex = new RegExp(`^${route.path.replace(/:[^/]+/g, '([\\w-]+)')}(\\?[\\w-]+(=[\\w-]+)?(&[\\w-]+(=[\\w-]+)?)*)?$`)
        return route.method === method && routeRegex.test(url)
      })

      if (!route) {
        res.statusCode = 404
        res.end('Not Found')

        return
      }

      // Extract parameters from the URL
      const params = {}
      const urlParts = url.split('/')
      const routeParts = route.path.split('/')

      for (let i = 0, length = routeParts.length; i < length; i++) {
        if (routeParts[i].startsWith(':')) {
          params[routeParts[i].slice(1)] = urlParts[i]
        }
      }

      // Apply route-level middleware
      let index = 0
      const routeNext = () => {
        if (index >= route.handlers.length) {
          // No more route handlers to execute
          next()
        } else {
          const handler = route.handlers[index]
          index++
          req.params = params

          handler(req, new Response(req), routeNext)
        }
      }

      // Start executing route handlers chain
      routeNext()
    },

    acl: (path, ...handlers) => {
      routes.push({ method: 'ACL', path, handlers })
    },

    bind: (path, ...handlers) => {
      routes.push({ method: 'BIND', path, handlers })
    },

    checkout: (path, ...handlers) => {
      routes.push({ method: 'CHECKOUT', path, handlers })
    },

    connect: (path, ...handlers) => {
      routes.push({ method: 'CONNECT', path, handlers })
    },

    copy: (path, ...handlers) => {
      routes.push({ method: 'COPY', path, handlers })
    },

    delete: (path, ...handlers) => {
      routes.push({ method: 'DELETE', path, handlers })

      return router
    },

    get: (path, ...handlers) => {
      routes.push({ method: 'GET', path, handlers })

      return router
    },

    head: (path, ...handlers) => {
      routes.push({ method: 'HEAD', path, handlers })
    },

    link: (path, ...handlers) => {
      routes.push({ method: 'LINK', path, handlers })
    },

    lock: (path, ...handlers) => {
      routes.push({ method: 'LOCK', path, handlers })
    },

    msearch: (path, ...handlers) => {
      routes.push({ method: 'M-SEARCH', path, handlers })
    },

    merge: (path, ...handlers) => {
      routes.push({ method: 'MERGE', path, handlers })
    },

    mkactivity: (path, ...handlers) => {
      routes.push({ method: 'MKACTIVITY', path, handlers })
    },

    mkcalendar: (path, ...handlers) => {
      routes.push({ method: 'MKCALENDAR', path, handlers })
    },

    mkcol: (path, ...handlers) => {
      routes.push({ method: 'MKCOL', path, handlers })
    },

    move: (path, ...handlers) => {
      routes.push({ method: 'MOVE', path, handlers })
    },

    notify: (path, ...handlers) => {
      routes.push({ method: 'NOTIFY', path, handlers })
    },

    options: (path, ...handlers) => {
      routes.push({ method: 'OPTIONS', path, handlers })
    },

    patch: (path, ...handlers) => {
      routes.push({ method: 'PATCH', path, handlers })

      return router
    },

    post: (path, ...handlers) => {
      routes.push({ method: 'POST', path, handlers })

      return router
    },

    propfind: (path, ...handlers) => {
      routes.push({ method: 'PROPFIND', path, handlers })
    },

    proppatch: (path, ...handlers) => {
      routes.push({ method: 'PROPPATCH', path, handlers })
    },

    put: (path, ...handlers) => {
      routes.push({ method: 'PUT', path, handlers })

      return router
    },

    purge: (path, ...handlers) => {
      routes.push({ method: 'PURGE', path, handlers })
    },

    rebind: (path, ...handlers) => {
      routes.push({ method: 'REBIND', path, handlers })
    },

    report: (path, ...handlers) => {
      routes.push({ method: 'REPORT', path, handlers })
    },

    search: (path, ...handlers) => {
      routes.push({ method: 'SEARCH', path, handlers })
    },

    source: (path, ...handlers) => {
      routes.push({ method: 'SOURCE', path, handlers })
    },

    subscribe: (path, ...handlers) => {
      routes.push({ method: 'SUBSCRIBE', path, handlers })
    },

    trace: (path, ...handlers) => {
      routes.push({ method: 'TRACE', path, handlers })
    },

    unbind: (path, ...handlers) => {
      routes.push({ method: 'UNBIND', path, handlers })
    },

    unlink: (path, ...handlers) => {
      routes.push({ method: 'UNLINK', path, handlers })
    },

    unlock: (path, ...handlers) => {
      routes.push({ method: 'UNLOCK', path, handlers })
    },

    unsubscribe: (path, ...handlers) => {
      routes.push({ method: 'UNSUBSCRIBE', path, handlers })
    },

    use: (method, path, ...handlers) => {
      routes.push({ method, path, handlers })

      return router
    }
  }

  return router
}

export default createRouter
