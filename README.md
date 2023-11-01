# mocaccino
Fully compatible Express specification running with Bun.

## Compatibility with Express 4 API

Sure, here's an unchecked checklist for an Express 4 API documentation organized into sections:

## Mocaccino

### Methods
- [X] `mocaccino()` constructor
- [X] `mocaccino.formdata([options])` - No `options` implemented yet. New middleware not avaible in Express.
- [X] `mocaccino.json([options])` - No `options` implemented yet
- [ ] `mocaccino.raw([options])`
- [ ] `mocaccino.static(root, [options])`
- [ ] `mocaccino.text()`
- [X] `mocaccino.urlencoded([options])` - No `options` implemented yet

## Application

### Properties
- [ ] `app.locals`
- [ ] `app.mountpath`

### Events
- [ ] `app.mount`

### Methods
- [ ] `app.all()`
- [X] `app.delete()`
- [ ] `app.disable()`
- [ ] `app.enable()`
- [ ] `app.enabled()`
- [ ] `app.engine()`
- [X] `app.get()`
- [ ] `app.head()`
- [X] `app.listen()`
- [ ] `app.options()`
- [ ] `app.param()`
- [X] `app.patch()`
- [ ] `app.path()`
- [X] `app.post()`
- [X] `app.put()`
- [ ] `app.render()`
- [ ] `app.route()`
- [ ] `app.set()`
- [ ] `app.trace()`
- [X] `app.use()`

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
- [X] `router.delete()`
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
- [X] `router.patch()`
- [X] `router.post()`
- [ ] `router.purge()`
- [X] `router.put()`
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
