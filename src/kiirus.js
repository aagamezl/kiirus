import { EventEmitter } from 'bun:events'

import Application from './Application.js'
import Router from './Router.js'
import { mergeDescriptors } from './utils'

/**
 * Callback function handling the buffer from a fetch response body.
 * @callback BufferCallback
 * @param {Buffer} buffer - The buffer containing the fetched data.
 */

/**
 * Default options for a specific functionality.
 * @typedef {Application & import('node:events').EventEmitter} KiirusApplication
 */

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
  const app = (req, res, next) => {
    /**
     * Monkey patch to deal with requests from testing libraries
     *
     * @param {string} name
     * @returns {string | string[] | undefined}
     */
    req.headers.get = (name) => {
      return req.headers[name]
    }

    /** @type {Response} */
    const fetchResponse = app.handle.bind(proto)(req)

    // Set the headers and status code for the Node.js HTTP response
    res.statusCode = fetchResponse.status

    for (const [key, value] of fetchResponse.headers.entries()) {
      res.setHeader(key, value)
    }

    if (!fetchResponse.body) {
      return res.end()
    }

    fetchResponse.body().then(/** @type {BufferCallback} */ async (buffer) => {
      res.write(buffer)
      res.end()
    })
  }

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

export default kiirus
