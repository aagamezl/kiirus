import createRouteRegEx from './utils/createRouteRegEx'

const routes = []

class Router {
  acl (path, ...handlers) {
    routes.push({ method: 'ACL', path, handlers })
  }

  bind (path, ...handlers) {
    routes.push({ method: 'BIND', path, handlers })
  }

  checkout (path, ...handlers) {
    routes.push({ method: 'CHECKOUT', path, handlers })
  }

  connect (path, ...handlers) {
    routes.push({ method: 'CONNECT', path, handlers })
  }

  copy (path, ...handlers) {
    routes.push({ method: 'COPY', path, handlers })
  }

  delete (path, ...handlers) {
    routes.push({
      method: 'DELETE',
      path: createRouteRegEx(path),
      handlers
    })

    return this
  }

  get (path, ...handlers) {
    routes.push({
      method: 'GET',
      path: createRouteRegEx(path),
      handlers
    })

    return this
  }

  handleRequest (req, res, next) {
    const { method, url } = req

    const route = routes.find(route => {
      return route.method === method && route.path.test(url)
    })

    if (!route) {
      return new Response(undefined, { statusText: 'Not Found', status: 404 })
    }

    // Apply route-level middleware
    let index = 0
    const routeNext = () => {
      if (index >= route.handlers.length) {
        // No more route handlers to execute
        return next()
      } else {
        const handler = route.handlers[index]
        req.params = url.match(route.path).groups
        index++

        return handler(req, res, routeNext)
      }
    }

    // Start executing route handlers chain
    return routeNext()
  }

  head (path, ...handlers) {
    routes.push({ method: 'HEAD', path, handlers })
  }

  link (path, ...handlers) {
    routes.push({ method: 'LINK', path, handlers })
  }

  lock (path, ...handlers) {
    routes.push({ method: 'LOCK', path, handlers })
  }

  msearch (path, ...handlers) {
    routes.push({ method: 'M-SEARCH', path, handlers })
  }

  merge (path, ...handlers) {
    routes.push({ method: 'MERGE', path, handlers })
  }

  mkactivity (path, ...handlers) {
    routes.push({ method: 'MKACTIVITY', path, handlers })
  }

  mkcalendar (path, ...handlers) {
    routes.push({ method: 'MKCALENDAR', path, handlers })
  }

  mkcol (path, ...handlers) {
    routes.push({ method: 'MKCOL', path, handlers })
  }

  move (path, ...handlers) {
    routes.push({ method: 'MOVE', path, handlers })
  }

  notify (path, ...handlers) {
    routes.push({ method: 'NOTIFY', path, handlers })
  }

  options (path, ...handlers) {
    routes.push({ method: 'OPTIONS', path, handlers })
  }

  patch (path, ...handlers) {
    routes.push({
      method: 'PATCH',
      path: createRouteRegEx(path),
      handlers
    })

    return this
  }

  post (path, ...handlers) {
    routes.push({
      method: 'POST',
      path: createRouteRegEx(path),
      handlers
    })

    return this
  }

  propfind (path, ...handlers) {
    routes.push({ method: 'PROPFIND', path, handlers })
  }

  proppatch (path, ...handlers) {
    routes.push({ method: 'PROPPATCH', path, handlers })
  }

  put (path, ...handlers) {
    routes.push({
      method: 'PUT',
      path: createRouteRegEx(path),
      handlers
    })

    return this
  }

  purge (path, ...handlers) {
    routes.push({ method: 'PURGE', path, handlers })
  }

  rebind (path, ...handlers) {
    routes.push({ method: 'REBIND', path, handlers })
  }

  report (path, ...handlers) {
    routes.push({ method: 'REPORT', path, handlers })
  }

  search (path, ...handlers) {
    routes.push({ method: 'SEARCH', path, handlers })
  }

  source (path, ...handlers) {
    routes.push({ method: 'SOURCE', path, handlers })
  }

  subscribe (path, ...handlers) {
    routes.push({ method: 'SUBSCRIBE', path, handlers })
  }

  trace (path, ...handlers) {
    routes.push({ method: 'TRACE', path, handlers })
  }

  unbind (path, ...handlers) {
    routes.push({ method: 'UNBIND', path, handlers })
  }

  unlink (path, ...handlers) {
    routes.push({ method: 'UNLINK', path, handlers })
  }

  unlock (path, ...handlers) {
    routes.push({ method: 'UNLOCK', path, handlers })
  }

  unsubscribe (path, ...handlers) {
    routes.push({ method: 'UNSUBSCRIBE', path, handlers })
  }

  use (method, path, ...handlers) {
    routes.push({ method, path, handlers })

    return this
  }
}

export default Router
