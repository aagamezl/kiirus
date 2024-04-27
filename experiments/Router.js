export default class Router {
  stack = []
  // constructor () { }

  get (path, ...middlewares) {
    const handlers = middlewares.flat()

    for (let index = 0; index < handlers.length; index++) {
      const handle = handlers[index]

      this.stack.push({
        method: 'GET',
        path,
        handle
      })
    }

    return this
  }

  // Method to execute the middleware and route handlers
  handle (req, res, done) {
    let index = 0

    // Function to execute the next middleware or route handler
    const next = () => {
      // If all middleware have been executed, try to execute route handler
      if (index === this.stack.length) {
        if (this.stack[req.url] && this.stack[req.url][req.method]) {
          return this.stack[req.url][req.method]()
        }

        return done()// No route handler found
      }

      const middleware = this.stack[index++]

      middleware.handle(req, res, next)
    }

    next()
  }

  // Method to add a new route
  route (path) {
    this.stack.push({
      path,
      handle: this.dispatch.bind(this)
    })

    return this
  }

  use (...middlewares) {
    const [path, handlers] = typeof middlewares[0] === 'string'
      ? [middlewares[0], middlewares.slice(1).flat()]
      : ['/', middlewares.flat()]

    for (let index = 0; index < handlers.length; index++) {
      const handle = handlers[index] instanceof Router ? handlers[index].handle.bind(handlers[index]) : handlers[index]

      this.stack.push({ path, handle })
    }
  }
}

// const proto = () => {
//   const router = (req, res, next) => {
//     router.handle(req, res, next)
//   }

//   // mixin Router class functions
//   Object.setPrototypeOf(router, proto)

//   router.stack = []

//   return router
// }

// proto.handle = function (req, res, done) {
//   let index = 0

//   // Function to execute the next middleware or route handler
//   const next = () => {
//     // If all middleware have been executed, try to execute route handler
//     if (index === this.stack.length) {
//       if (this.stack[req.url] && this.stack[req.url][req.method]) {
//         return this.stack[req.url][req.method]()
//       }

//       return done()// No route handler found
//     }

//     const middleware = this.stack[index++]
//     // const route = middleware.route

//     // if (!route) {
//     //   // process non-route handlers normally
//     //   return
//     // }

//     // console.log(middleware)
//     middleware.handle(req, res, next)
//   }

//   next()
// }

// proto.use = function (...middlewares) {
//   const [path, handlers] = typeof middlewares[0] === 'string'
//     ? [middlewares[0], middlewares.slice(1).flat()]
//     : ['/', middlewares.flat()]

//   for (let index = 0; index < handlers.length; index++) {
//     // const handle = handlers[index] instanceof Router ? handlers[index].handle.bind(handlers[index]) : handlers[index]
//     const handle = handlers[index]

//     // routes.push({ path, handle })
//     this.stack.push({ path, handle })
//   }
// }

// export default proto
