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
- [ ] `app.acl`
- [ ] `app.bind`
- [ ] `app.checkout`
- [ ] `app.connect`
- [ ] `app.copy`
- [ ] `app.delete`
- [ ] `app.disable()`
- [ ] `app.enable()`
- [ ] `app.enabled()`
- [ ] `app.engine()`
- [ ] `app.get`
- [ ] `app.head`
- [ ] `app.link`
- [X] `app.listen()`
- [ ] `app.lock`
- [ ] `app.m-search`
- [ ] `app.merge`
- [ ] `app.mkactivity`
- [ ] `app.mkcalendar`
- [ ] `app.mkcol`
- [ ] `app.move`
- [ ] `app.notify`
- [ ] `app.options`
- [ ] `app.param()`
- [ ] `app.patch`
- [ ] `app.path()`
- [ ] `app.post`
- [ ] `app.propfind`
- [ ] `app.proppatch`
- [ ] `app.purge`
- [ ] `app.put`
- [ ] `app.rebind`
- [ ] `app.render()`
- [ ] `app.report`
- [ ] `app.route()`
- [ ] `app.search`
- [ ] `app.set()`
- [ ] `app.source`
- [ ] `app.subscribe`
- [ ] `app.trace`
- [ ] `app.unbind`
- [ ] `app.unlink`
- [ ] `app.unlock`
- [ ] `app.unsubscribe`
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
- [ ] `router.acl`
- [ ] `router.bind`
- [ ] `router.checkout`
- [ ] `router.connect`
- [ ] `router.copy`
- [ ] `router.delete`
- [X] `router.get`
- [ ] `router.head`
- [ ] `router.link`
- [ ] `router.lock`
- [ ] `router.m-search`
- [ ] `router.merge`
- [ ] `router.mkactivity`
- [ ] `router.mkcalendar`
- [ ] `router.mkcol`
- [ ] `router.move`
- [ ] `router.notify`
- [ ] `router.options`
- [ ] `router.param()`
- [ ] `router.patch`
- [X] `router.post`
- [ ] `router.propfind`
- [ ] `router.proppatch`
- [ ] `router.purge`
- [ ] `router.put`
- [ ] `router.rebind`
- [ ] `router.report`
- [ ] `router.route()`
- [ ] `router.search`
- [ ] `router.source`
- [ ] `router.subscribe`
- [ ] `router.trace`
- [ ] `router.unbind`
- [ ] `router.unlink`
- [ ] `router.unlock`
- [ ] `router.unsubscribe`
- [ ] `router.use()`

## Error Handling

- [ ] Error handling middleware

## View Rendering

- [ ] View engines
- [ ] Template rendering

## License

[MIT](https://choosealicense.com/licenses/mit/)
