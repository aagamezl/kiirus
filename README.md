# mocaccino
Fully compatible Express specification running with Bun

## Compatibility 

Sure, here's an unchecked checklist for an Express 4 API documentation organized into sections:

# Express 4 API Documentation Checklist

## Application

- [X] `mocaccino()` constructor
- [X] `mocaccino.json([options])` - No `options` implemented yet
- [X] `mocaccino.urlencoded([options])` - No `options` implemented yet
- [X] `app.listen()`
- [ ] `app.disable()`
- [ ] `app.enable()`
- [ ] `app.enabled()`
- [ ] `app.set()`
- [ ] `app.get()`
- [ ] `app.engine()`
- [ ] `app.param()`
- [ ] `app.path()`
- [ ] `app.render()`
- [X] `app.use()`
- [ ] `app.all()`
- [ ] `app.get()`
- [ ] `app.post()`
- [ ] `app.put()`
- [ ] `app.delete()`
- [ ] `app.options()`
- [ ] `app.head()`
- [ ] `app.trace()`
- [ ] `app.route()`
- [ ] `app.locals`
- [ ] `app.mountpath`

## Request

- [ ] `req.app`
- [ ] `req.baseUrl`
- [X] `req.body`
- [ ] `req.cookies`
- [ ] `req.fresh`
- [ ] `req.hostname`
- [ ] `req.ip`
- [ ] `req.ips`
- [ ] `req.method`
- [ ] `req.originalUrl`
- [X] `req.params`
- [ ] `req.path`
- [ ] `req.protocol`
- [ ] `req.query`
- [ ] `req.route`
- [ ] `req.signedCookies`
- [ ] `req.stale`
- [ ] `req.subdomains`
- [ ] `req.xhr`

## Response

- [ ] `res.app`
- [ ] `res.append()`
- [ ] `res.attachment()`
- [ ] `res.clearCookie()`
- [ ] `res.cookie()`
- [ ] `res.download()`
- [ ] `res.end()`
- [ ] `res.format()`
- [X] `res.get()`
- [X] `res.json()`
- [ ] `res.jsonp()`
- [ ] `res.links()`
- [ ] `res.location()`
- [ ] `res.redirect()`
- [ ] `res.render()`
- [X] `res.send()`
- [ ] `res.sendFile()`
- [ ] `res.sendStatus()`
- [X] `res.set()`
- [X] `res.status()`
- [X] `res.type()`
- [ ] `res.vary()`

## Router

- [ ] `router.all()`
- [ ] `router.checkout()`
- [ ] `router.copy()`
- [ ] `router.delete()`
- [X] `router.get()`
- [ ] `router.head()`
- [ ] `router.lock()`
- [ ] `router.merge()`
- [ ] `router.mkactivity()`
- [ ] `router.mkcol()`
- [ ] `router.move()`
- [ ] `router.m-search()`
- [ ] `router.notify()`
- [ ] `router.options()`
- [ ] `router.patch()`
- [X] `router.post()`
- [ ] `router.purge()`
- [ ] `router.put()`
- [ ] `router.report()`
- [ ] `router.search()`
- [ ] `router.subscribe()`
- [ ] `router.trace()`
- [ ] `router.unlock()`
- [ ] `router.unsubscribe()`
- [ ] `router.route()`
- [X] `router.use()`
- [ ] `router.param()`

## Middleware

- [ ] Custom middleware functions

## Error Handling

- [ ] Error handling middleware

## View Rendering

- [ ] View engines
- [ ] Template rendering

## Miscellaneous

- [ ] `express.static()`
- [ ] Built-in middleware
