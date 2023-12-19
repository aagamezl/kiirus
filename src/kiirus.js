import { EventEmitter } from 'bun:events'

import Application from './Application.js'
import Router from './Router.js'
import { mergeDescriptors } from './utils'

/**
 *
 * @returns {KiirusApplication}
 */
const kiirus = () => {
  const proto = new Application()

  /**
 * This function is necessary to manage usage with testing libraries
 *
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 * @param {Function} next
 */
  const app = (req, res, next) => {}

  mergeDescriptors(app, EventEmitter.prototype, false)
  mergeDescriptors(app, Object.getPrototypeOf(proto), false)
  Object.setPrototypeOf(app, proto)

  return app
}

/**
 * Create a router object.
 * @function
 * @param {import('./Router.js').DefaultOptions} options
 * @returns {Router} An kiirus router instance.
 */
kiirus.Router = (options = {}) => {
  return new Router(options)
}

/**
 * Create a middleware that parses JSON bodies.
 * @function
 * @param {object} [options] - Options for JSON parsing middleware.
 * @returns {import('./Router.js').Middleware} JSON parsing middleware.
 */
kiirus.json = (options) => {
  /**
 * @param {import('./ClientRequest.js').default} req
 * @param {Response} res
 * @param {Function} next
 */
  return async (req, res, next) => {
    req.body = await req.raw.json()

    return next(req, res)
  }
}

export default kiirus
