import Application from './Application'
import Router from './Router.js'

// Export the framework
const kiirus = () => new Application()

/**
 * Create a router object.
 * @function
 * @returns {Router} An kiirus router instance.
 */
kiirus.Router = (options = {}) => {
  return new Router(options)
}

export default kiirus
