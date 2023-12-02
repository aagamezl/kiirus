# Kiirus
Fully Express API compatible replacement built for Bun. The motivation is to have an Express alternative with the same API but with high performance and written for Bun.

This library tries to have no dependencies or as few as possible.

![Node CI](https://github.com/aagamezl/kiirus/workflows/Node%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/aagamezl/kiirus/badge.svg?branch=master)](https://coveralls.io/github/aagamezl/kiirus?branch=master)
![npm (scoped)](https://img.shields.io/npm/v/@aagamezl/kiirus)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@aagamezl/kiirus?color=red)
![npm](https://img.shields.io/npm/dt/@aagamezl/kiirus)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub issues](https://img.shields.io/github/issues-raw/aagamezl/kiirus)
![GitHub](https://img.shields.io/github/license/aagamezl/kiirus)

## Compatibility with Express 5 API

## Kiirus

### Methods
- [X] `kiirus()` constructor
- [ ] `kiirus.formdata([options])` - No `options` implemented yet. New middleware not avaible in Express.
- [ ] `kiirus.json([options])` - No `options` implemented yet
- [ ] `kiirus.raw([options])`
- [X] `kiirus.Router([options])` - `mergeParams` option not implemented yet
- [ ] `kiirus.static(root, [options])`
- [ ] `kiirus.text()`
- [ ] `kiirus.urlencoded([options])` - No `options` implemented yet

## Application

### Properties
- [ ] `app.locals`
- [ ] `app.mountpath`
- [ ] `app.router`

### Events
- [ ] `app.mount`

### Methods
- [X] `app.acl`
- [X] `app.bind`
- [X] `app.checkout`
- [X] `app.connect`
- [X] `app.copy`
- [X] `app.delete`
- [X] `app.disable()`
- [X] `app.enable()`
- [X] `app.enabled()`
- [X] `app.engine()`
- [X] `app.get`
- [X] `app.head`
- [X] `app.link`
- [X] `app.listen()`
- [X] `app.lock`
- [X] `app.msearch`
- [X] `app.merge`
- [X] `app.mkactivity`
- [X] `app.mkcalendar`
- [X] `app.mkcol`
- [X] `app.move`
- [X] `app.notify`
- [X] `app.options`
- [ ] `app.param()`
- [X] `app.patch`
- [X] `app.path()`
- [X] `app.post`
- [X] `app.propfind`
- [X] `app.proppatch`
- [X] `app.purge`
- [X] `app.put`
- [X] `app.rebind`
- [X] `app.render()`
- [X] `app.report`
- [ ] `app.route()`
- [X] `app.search`
- [ ] `app.set()`
- [X] `app.source`
- [X] `app.subscribe`
- [X] `app.trace`
- [X] `app.unbind`
- [X] `app.unlink`
- [X] `app.unlock`
- [X] `app.unsubscribe`
- [X] `app.use()`

## Request

### Properties

- [ ] `req.app`
- [ ] `req.baseUrl`
- [ ] `req.body`
- [ ] `req.cookies`
- [ ] `req.fresh`
- [ ] `req.hostname`
- [ ] `req.ip`
- [ ] `req.ips`
- [ ] `req.method`
- [ ] `req.originalUrl`
- [ ] `req.params`
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
- [ ] `res.get()`
- [X] `res.json()`
- [ ] `res.jsonp()`
- [ ] `res.links()`
- [ ] `res.location()`
- [ ] `res.redirect()`
- [ ] `res.render()`
- [ ] `res.send()`
- [ ] `res.sendFile()`
- [ ] `res.sendStatus()`
- [ ] `res.set()`
- [ ] `res.status()`
- [ ] `res.type()`
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
- [X] `router.msearch`
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
- [ ] `router.source`
- [X] `router.subscribe`
- [X] `router.trace`
- [X] `router.unbind`
- [X] `router.unlink`
- [X] `router.unlock`
- [X] `router.unsubscribe`
- [ ] `router.use()`

## Error Handling

- [ ] Error handling middleware

## View Rendering

- [ ] View engines
- [ ] Template rendering

## License

[MIT](https://choosealicense.com/licenses/mit/)
