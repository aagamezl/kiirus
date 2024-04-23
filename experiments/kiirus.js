import Router from './Router.js'
import Application from './Application.js'

const kiirus = () => {
  const proto = new Application()

  const app = (req, res, next) => {
    app.handle(req, res, next)
  }

  Object.setPrototypeOf(app, proto)

  return app
}

kiirus.Router = (options = {}) => {
  return new Router(options)
}

export default kiirus
