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

### Properties

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

### Methods

- [ ] `req.accepts()`
- [ ] `req.acceptsCharsets()`
- [ ] `req.acceptsEncodings()`
- [ ] `req.acceptsLanguages()`
- [ ] `req.get()`
- [ ] `req.is()`
- [ ] `req.param()`
- [ ] `req.range()`

## Response

### Properties

- [ ] `res.app`
- [ ] `res.headersSent`
- [ ] `res.locals`

### Methods

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

## Methods

- [ ] `router.all()`
- [X] `router.acl`
- [X] `router.bind`
- [X] `router.checkout`
- [X] `router.connect`
- [X] `router.copy`
- [X] `router.delete`
- [X] `router.get`
- [X] `router.head`
- [X] `router.link`
- [X] `router.lock`
- [X] `router.m-search`
- [X] `router.merge`
- [X] `router.mkactivity`
- [X] `router.mkcalendar`
- [X] `router.mkcol`
- [X] `router.move`
- [X] `router.notify`
- [X] `router.options`
- [ ] `router.param()`
- [X] `router.patch`
- [X] `router.post`
- [X] `router.propfind`
- [X] `router.proppatch`
- [X] `router.purge`
- [X] `router.put`
- [X] `router.rebind`
- [X] `router.report`
- [X] `router.route()`
- [X] `router.search`
- [X] `router.source`
- [X] `router.subscribe`
- [X] `router.trace`
- [X] `router.unbind`
- [X] `router.unlink`
- [X] `router.unlock`
- [X] `router.unsubscribe`
- [X] `router.use()`

## Middleware

- [X] `mocaccino.formdata()` custom middleware function to managa FORM-DATA

## Error Handling

- [ ] Error handling middleware

## View Rendering

- [ ] View engines
- [ ] Template rendering
