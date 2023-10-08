import helmet from 'helmet'
import cors from 'cors'
import session from 'cookie-session'

import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

// Application-level middleware
app.use((req, res, next) => {
  console.log('Executing application-level middleware')
  next()
})

// Create a router
const router = express.Router()

const routeMiddleware = (req, res, next) => {
  console.log('Executing route-level middleware')
  next()
}

router.get('/', routeMiddleware, (req, res) => {
  console.log(req.session)
  res.end('Hello, World!')
})

router.post('/users', (req, res) => {
  res.status(201).send(req.body)
})

router.get('/users/:userId/books/:bookId', (req, res) => {
  console.log(req.params)
  res.end()
})

app.use(helmet({
  contentSecurityPolicy: false,
  xDownloadOptions: true
}))

app.use(cors({
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000/',
    path: 'foo/bar',
    expires: expiryDate
  }
}))

app.use((req, res, next) => {
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
  next()
})

// Add the router to the app as application-level middleware
app.use(router)

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})
