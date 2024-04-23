import kiirus from '../src/kiirus.js'

const app = kiirus()
const port = 3000

// Create a router
const router = kiirus.Router({ strict: false })

app.use(kiirus.json())

// router.get('/', (req, res) => {
//   return res.status(200).json({ path: '/', lib: 'kiirus' })
// })

// router.post('/users', (req, res) => {
//   return res.json(req.body)
// })

// // Add the router to the app as application-level middleware
// app.use(router)

const routeMiddleware = (req, res, next) => {
  console.log('Executing route-level middleware')
  return next()
}

// app.use('/users', (req, res, next) => {
//   console.log('Executing path application-level middleware')
//   return next()
// })

// app.use(routeMiddleware, routeMiddleware, [routeMiddleware, routeMiddleware])

const headers = {
  get: (name) => 'http://localhost:3000'
}

const req = {
  headers,
  json: () => Promise.resolve({ userId: '34', bookId: '8989' }),
  method: 'POST',
  url: 'http://localhost:3000/users'
}

const res = {}

router.post('/users', (req, res) => {
  console.log(req.body)
  return res.json(req.body)
})

// Add the router to the app as application-level middleware
app.use(router)

app.handle(req, res)

// app.listen(port, () => {
//   console.log(`Kiirus app listening on port ${port}`)
// })
