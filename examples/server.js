import kiirus from '../src/kiirus.js'

const app = kiirus()
const port = 3000

// Create a router
const router = kiirus.Router()

// Application-level middleware
app.use((req, res, next) => {
  console.log('Executing application-level middleware')
  return next()
})

const routeMiddleware = (req, res, next) => {
  console.log('Executing route-level middleware')
  return next()
}

router.get('/', routeMiddleware, (req, res) => {
  // console.log(req.session)

  return res.json({ path: '/' })
})

router.get('/users', routeMiddleware, (req, res) => {
  return res.json({ path: '/users' })
})

// Add the router to the app as application-level middleware
app.use(router)

app.listen(port, () => {
  console.log(`Kiirus app listening on port ${port}`)
})
