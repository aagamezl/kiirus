import response from './response.js'

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
    // const { url } = request

    // Find route matching the request
    // const route = routes.find(r => {
    //   const routePathSegments = r.path.split('/')
    //   const requestPathSegments = url.split('/')

    //   if (routePathSegments.length !== requestPathSegments.length) {
    //     return false
    //   }

    //   for (let i = 0; i < routePathSegments.length; i++) {
    //     if (routePathSegments[i].startsWith(':')) {
    //       request.params[routePathSegments[i].slice(1)] = requestPathSegments[i]
    //     } else if (routePathSegments[i] !== requestPathSegments[i]) {
    //       return false
    //     }
    //   }

    //   return true
    // })
    // const route = routes.find(r => r.path === url && r.method === method)

    // Find route matching the request
    const route = routes.find(r => {
      // const routePath = r.path
      // const routeRegex = new RegExp(`^${routePath.replace(/:[^/]+/g, '([\\w-]+)')}$`)
      const routeRegex = new RegExp(`^${r.path.replace(/:[^/]+/g, '([\\w-]+)')}$`)
      return routeRegex.test(url) && r.method === method
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

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].slice(1)
        params[paramName] = urlParts[i]
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
        // handler(req, res, routeNext)

        Object.setPrototypeOf(response, res)

        // handler(req, Object.setPrototypeOf({ ...res, ...response }, Object.getPrototypeOf(res)), routeNext)
        handler(req, response, routeNext)
      }
    }

    // Start executing route handlers chain
    routeNext()
  }

  const use = (method, path, ...handlers) => {
    routes.push({ method, path, handlers })
  }

  const get = (path, ...handlers) => {
    routes.push({ method: 'GET', path, handlers })
  }

  const post = (path, ...handlers) => {
    routes.push({ method: 'POST', path, handlers })
  }

  return { handleRequest, get, post, use }
}

export default createRouter
