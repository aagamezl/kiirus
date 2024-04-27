import express from 'express'
// import request from 'supertest'

const app = express()
const router = express.Router()
const port = 3000

// // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
// router.use('/user/:id', (req, res, next) => {
//   console.log('Request URL:', req.originalUrl)
//   next()
// }, (req, res, next) => {
//   console.log('Request Type:', req.method)
//   next()
// })

// // a middleware sub-stack that handles GET requests to the /user/:id path
// router.get('/user/:id', (req, res, next) => {
//   // if the user ID is 0, skip to the next router
//   if (req.params.id === '0') next('route')
//   // otherwise pass control to the next middleware function in this stack
//   else next()
// }, (req, res, next) => {
//   // render a regular page
//   res.render('regular')
// })

// // handler for the /user/:id path, which renders a special page
// router.get('/user/:id', (req, res, next) => {
//   console.log(req.params.id)
//   res.render('special')
// })

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log('Router Middleware - time:', Date.now())
  next()
})

// mount the router on the app
app.use('/users', router)

app.get('/users', (req, res) => {
  res.send('Hello World!!!')
})

// Simulate a request
// const req = {
//   method: 'GET',
//   url: '/',
//   path: '/',
//   headers: {
//     'content-type': 'application/json',
//     accept: '*/*',
//     'user-agent': 'simulated-request'
//   },
//   query: {},
//   params: {},
//   body: {},
//   get: function (header) {
//     return this.headers[header.toLowerCase()]
//   },
//   is: function (type) {
//     const contentType = this.get('content-type')
//     return type === contentType
//   }
// }

// const res = {
//   setHeader: () => { }
// }

// app.handle(req, res)
// request(app)
//   .get('/users')
//   .expect('Content-Type', /text/)
//   .expect('Content-Length', '12')
//   .expect(200)
//   .end((err, res) => {
//     if (err) {
//       throw err
//     }
//   })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
