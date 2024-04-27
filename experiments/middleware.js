// Function to create a new router
// const createRouter = () => {
//   // const middlewares = []
//   // const routes = []

// import Router from './Router.js'
import kiirus from './kiirus.js'

//   // Function to add a new middleware
//   const use = (...middlewares) => {
//     const [path, handlers] = typeof middlewares[0] === 'string'
//       ? [middlewares[0], middlewares.slice(1).flat()]
//       : ['/', middlewares.flat()]

//     for (let index = 0; index < handlers.length; index++) {
//       const handle = handlers[index]

//       // routes.push({ path, handle })
//       router.stack.push({ path, handle })
//     }
//   }

//   // Function to add a new route
//   const route = (method, path, handler) => {
//     routes[path] = routes[path] || {}
//     routes[path][method] = handler
//   }

//   // Function to execute the middleware and route handlers
//   const handle = (req, res, done) => {
//     let index = 0

//     // Function to execute the next middleware or route handler
//     const next = () => {
//       // If all middleware have been executed, try to execute route handler
//       if (index === routes.length) {
//         if (routes[req.url] && routes[req.url][req.method]) {
//           return routes[req.url][req.method]()
//         }

//         return done()// No route handler found
//       }

//       const middleware = routes[index++]
//       // const route = middleware.route

//       // if (!route) {
//       //   // process non-route handlers normally
//       //   return
//       // }

//       // console.log(middleware)
//       middleware.handle(req, res, next)
//     }

//     next()
//   }

//   // return { use, route, handle }
//   const router = (req, res, next) => {
//     router.handle(req, res, next)
//   }

//   // mixin Router class functions
//   Object.setPrototypeOf(router, { handle, use })
//   router.stack = []

//   return router
// }

// Example middleware functions
// const loggerMiddleware = (req, res, next) => {
//   console.log(`${req.method} ${req.url}`)
//   next()
// }

// const authMiddleware = (req, res, next) => {
//   req.user = { id: 1, name: 'John Doe' }
//   next()
// }

// Create a new app
const app = kiirus()

// Create a new router
// const router = createRouter()
// const router = createRouter()
// const router = new Router()
// const router = app.router()
const router = kiirus.Router()

// // // Router-level middleware
// router.use((req, res, next) => {
//   console.log('Router-level middleware called')
//   next()
// })

// // Route handler
// router.route('GET', '/home', (req, res) => {
//   res.message = 'Welcome to the home page!'
//   console.log(res.message)
// })

// // Use the middleware functions
// app.use(loggerMiddleware)
// app.use(authMiddleware)

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log('Router Middleware - time:', Date.now())
  next()
})

// // Mount the router on the app
app.use('/users', router)

app.get('/users', (req, res) => {
  res.send('Hello World!')
})

// Simulate a request
const req = {
  method: 'GET',
  url: '/',
  path: '/',
  headers: {
    'content-type': 'application/json',
    accept: '*/*',
    'user-agent': 'simulated-request'
  },
  query: {},
  params: {},
  body: {},
  get: function (header) {
    return this.headers[header.toLowerCase()]
  },
  is: function (type) {
    const contentType = this.get('content-type')
    return type === contentType
  }
}

const res = {
  setHeader: () => { },
  send: (data) => {
    console.log(data)
  }
}

// Execute the middleware stack
app.handle(req, res)

// The request object now has user information
console.log(req.user) // Output: { id: 1, name: 'John Doe' }
