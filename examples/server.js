import kiirus from '../src/kiirus.js'

const app = kiirus()
const port = 3000

// Create a router
const router = kiirus.Router({ strict: false })

app.use(kiirus.json())

router.get('/', (req, res) => {
  return res.status(200).json({ path: '/', lib: 'kiirus' })
})

router.post('/users', (req, res) => {
  return res.json(req.body)
})

// Add the router to the app as application-level middleware
app.use(router)

app.listen(port, () => {
  console.log(`Kiirus app listening on port ${port}`)
})
