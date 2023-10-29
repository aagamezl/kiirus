// import response from './response.js'
import Response from './response.js'
// import createResponse from './response.js'

/**
 * Create an Express Router object.
 * @typedef {Object} router
 * @property {(path: string, middleware: Function)} all - Route middleware that will be executed for all HTTP methods at a specified path.
 * @property {(param: string|Function, callback: Function) => void} param - Route middleware for parameter processing.
 * @property {(path: string) => object} route - Create a new Route object for the specified path.
 * @property {(path: string, middleware: Function) => void} use - Route middleware that will be executed for all HTTP methods at a specified path.
 */
// const router = () => {
//   return {
//     /**
//      * Route middleware that will be executed for all HTTP methods at a specified path.
//      * @function
//      * @param {string} path - The path at which the middleware should be executed.
//      * @param {function} middleware - The middleware function to be executed.
//      */
//     all: (path, middleware) => {
//       // Implementation here
//     },

//     checkout: () => { },
//     copy: () => { },
//     delete: () => { },
//     get: () => { },
//     head: () => { },
//     lock: () => { },
//     merge: () => { },
//     mkactivity: () => { },
//     mkcol: () => { },
//     move: () => { },
//     'm-search': () => { },
//     notify: () => { },
//     options: () => { },
//     patch: () => { },
//     post: () => { },
//     purge: () => { },
//     put: () => { },
//     report: () => { },
//     search: () => { },
//     subscribe: () => { },
//     trace: () => { },
//     unlock: () => { },
//     unsubscribe: () => { },

//     /**
//      * Route middleware for parameter processing.
//      * @function
//      * @param {string|function} param - The parameter name or a callback function.
//      * @param {function} callback - The middleware function to be executed for the parameter.
//      */
//     param: (param, callback) => {
//       // Implementation here
//     },

//     /**
//      * Create a new Route object for the specified path.
//      * @function
//      * @param {string} path - The path pattern for the route.
//      * @returns {object} A new Route instance.
//      */
//     route: (path) => {
//       // Implementation here
//     },

//     /**
//      * Route middleware that will be executed for all HTTP methods at a specified path.
//      * @function
//      * @param {string} path - The path at which the middleware should be executed.
//      * @param {function} middleware - The middleware function to be executed.
//      */
//     use: (path, middleware) => {
//       // Implementation here
//     }
//   }
// }

// export default router

const createRouter = () => {
  const routes = []

  const handleRequest = (req, res, next) => {
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
        // const paramName = routeParts[i].slice(1)
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
  }

  const use = (method, path, ...handlers) => {
    routes.push({ method, path, handlers })
  }

  const deleteHandler = (path, ...handlers) => {
    routes.push({ method: 'DELETE', path, handlers })
  }

  const get = (path, ...handlers) => {
    routes.push({ method: 'GET', path, handlers })
  }

  const patch = (path, ...handlers) => {
    routes.push({ method: 'PATCH', path, handlers })
  }

  const post = (path, ...handlers) => {
    routes.push({ method: 'POST', path, handlers })
  }

  const put = (path, ...handlers) => {
    routes.push({ method: 'PUT', path, handlers })
  }

  const update = (path, ...handlers) => {
    routes.push({ method: 'UPDATE', path, handlers })
  }

  return {
    handleRequest,
    delete: deleteHandler,
    get,
    patch,
    post,
    put,
    update,
    use
  }
}

export default createRouter
