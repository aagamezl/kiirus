class Application {
  // #appMiddleware = []
  // #routerStack = []

  constructor () {
    this.mountpath = '/'

    this.appMiddleware = []
    this.routerStack = []
  }

  /**
   *:ount middleware to be executed for every request to the
   * @function
   * @param {import('./router.js').Middleware[] | import('./router.js').Router} [middleware] - The middleware function to be executed.
   */
  use (...args) {
    let mountpath
    let path
    let middlewares

    // Check if the first argument is a path
    if (typeof args[0] === 'string') {
      mountpath = args[0].at(0) === '/' ? args[0] : `/${args[0]}`
      // path = new RegExp(`${args[0].at(0) === '/' ? args[0] : `/${args[0]}`}/?.*`, 'g')
      path = new RegExp(`${mountpath}/?.*`, 'g')
      middlewares = args.slice(1)
    } else {
      mountpath = '/'
      path = /\/.*/g
      middlewares = args.flat()
    }

    middlewares.forEach((callback) => {
      callback.mountpath = mountpath
      callback.parent = this

      if (typeof callback === 'function') {
        this.appMiddleware.push({ path, callback })
      } else if (callback && callback.handleRequest) {
        this.routerStack.push({ path, callback: callback.handleRequest })
      } else {
        throw new Error('Invalid middleware')
      }
    })
  }
}

export default Application
