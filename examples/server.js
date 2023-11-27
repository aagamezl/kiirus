import kiirus from '../src/kiirus.js'

const app = kiirus()
const port = 3001

// Create a router
const router = kiirus.Router({ strict: false })

// Application-level middleware
app.use((req, res, next) => {
  console.log('Executing application-level middleware')
  return next()
})

const routeMiddleware = (req, res, next) => {
  console.log('Executing route-level middleware')
  return next()
}

router.get('/', (req, res) => {
  return res.json({ path: '/', lib: 'kiirus' })
})

router.get('/users/', (req, res) => {
  return res.json({ path: '/users/', lib: 'kiirus' })
})

router.get('/users', (req, res) => {
  return res.json({ path: '/users', lib: 'kiirus' })
})

// Add the router to the app as application-level middleware
app.use(router)

app.listen(port, () => {
  console.log(`Kiirus app listening on port ${port}`)
})
