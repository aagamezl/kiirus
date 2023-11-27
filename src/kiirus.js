import Application from './Application'
import Router from './Router.js'

// Export the framework
const kiirus = () => new Application()

/**
 * Create a router object.
 * @function
 * @returns {Router} An kiirus router instance.
 */
kiirus.Router = () => {
  return new Router()
}

export default kiirus
