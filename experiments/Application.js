import { EventEmitter } from 'node:events'

import Router from './Router.js'

// Function to create a new application
// const createApp = () => {
//   // Function to add a new middleware or router
//   const use = (...middlewares) => {
//     const [path, handlers] = typeof middlewares[0] === 'string'
//       ? [middlewares[0], middlewares.slice(1).flat()]
//       : ['/', middlewares.flat()]

//     if (!this.router) {
//       this.router = new Router()
//     }

//     for (let index = 0; index < handlers.length; index++) {
//       const middleware = handlers[index]

//       // non-express app
//       if (!middleware || !middleware.handle || !middleware.set) {
//         // return router.use(path, middleware)
//         return app.router.use(path, middleware)
//       }

//       middleware.mountpath = path
//       middleware.parent = app

//       app.router.use(path, middleware)
//     }
//   }

//   // Function to execute the middleware stack
//   const handle = (req, res, callback) => {
//     const finalhandler = (req, res, options) => {
//       return {
//         // env: 'env',
//         // onerror: console.error(app)
//       }
//     }

//     // next()
//     // final handler
//     const done = callback || finalhandler

//     app.router.handle(req, res, done)
//   }

//   const app = { use, handle }

//   // app.router = new Router()
//   app.router = Router

//   return app
// }

// export default createApp

export default class Application extends EventEmitter {
  constructor () {
    super()

    this.router = new Router()
  }

  get (path, ...handlers) {
    this.router.get(path, handlers)
  }

  // Method to execute the middleware stack
  handle (req, res, callback) {
    const finalhandler = (req, res, options) => {
      return {
        // env: 'env',
        // onerror: console.error(app)
      }
    }

    // next()
    // final handler
    const done = callback || finalhandler

    this.router.handle(req, res, done)
  }

  // Method to add a new middleware or router
  use (...middlewares) {
    const [path, handlers] = typeof middlewares[0] === 'string'
      ? [middlewares[0], middlewares.slice(1).flat()]
      : ['/', middlewares.flat()]

    if (!this.router) {
      this.router = new Router()
    }

    for (let index = 0; index < handlers.length; index++) {
      const middleware = handlers[index]

      // non-express app
      if (!middleware || !middleware.handle || !middleware.set) {
        // return router.use(path, middleware)
        return this.router.use(path, middleware)
      }

      middleware.mountpath = path
      middleware.parent = this

      this.router.use(path, middleware)
    }
  }
}
