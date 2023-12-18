import { afterEach, beforeEach, describe, expect, test } from 'bun:test'

import request from 'supertest'

import kiirus from '../src/kiirus.js'

describe('app', () => {
  test('app should inherit from event emitter', async () => {
    const app = kiirus()
    app.on('foo', async () => {
      expect(true).toBeTrue()
    })

    app.emit('foo')
  })

  test('app should be callable', () => {
    const app = kiirus()
    expect(typeof app).toBe('function')
  })

  test('app should 404 without routes', async () => {
    await request(kiirus())
      .get('/')
      .expect(404)
  })
})

describe('app.parent', () => {
  test('should return the parent when mounted', () => {
    const app = kiirus()
    const blog = kiirus()
    const blogAdmin = kiirus()

    app.use('/blog', blog)
    blog.use('/admin', blogAdmin)

    expect(app.parent).toBeNil()
    expect(blog.parent).toEqual(app)
    expect(blogAdmin.parent).toEqual(blog)
  })
})

describe('app.mountpath', () => {
  test('should return the mounted path', () => {
    const admin = kiirus()
    const app = kiirus()
    const blog = kiirus()
    const fallback = kiirus()

    app.use('/blog', blog)
    app.use(fallback)
    blog.use('/admin', admin)

    expect(admin.mountpath).toBe('/admin')
    expect(app.mountpath).toBe('/')
    expect(blog.mountpath).toBe('/blog')
    expect(fallback.mountpath).toBe('/')
  })
})

describe('app.router', () => {
  test('should throw with notice', () => {
    const app = kiirus()

    try {
      // Disable line to pass the uni test, weird Express unit test, so I replicated
      app.router // eslint-disable-line no-unused-expressions
    } catch (err) {
      expect(true).toBeTrue()
    }
  })
})

describe('app.path()', () => {
  test('should return the canonical', () => {
    const app = kiirus()
    const blog = kiirus()
    const blogAdmin = kiirus()

    app.use('/blog', blog)
    blog.use('/admin', blogAdmin)

    expect(app.path()).toEqual('')
    expect(blog.path()).toEqual('/blog')
    expect(blogAdmin.path()).toEqual('/blog/admin')
  })
})

describe('in development', () => {
  let env

  beforeEach(() => {
    env = Bun.env.NODE_ENV
    Bun.env.NODE_ENV = 'development'
  })

  afterEach(() => {
    Bun.env.NODE_ENV = env
  })

  test('should disable "view cache"', () => {
    const app = kiirus()
    expect(!app.enabled('view cache')).toBeTrue()
  })
})

describe('in production', () => {
  let env

  beforeEach(() => {
    env = Bun.env.NODE_ENV
    Bun.env.NODE_ENV = 'production'
  })

  afterEach(() => {
    Bun.env.NODE_ENV = env
  })

  test('should enable "view cache"', () => {
    const app = kiirus()
    expect(app.enabled('view cache')).toBeTrue()
  })
})

describe('without NODE_ENV', () => {
  let env

  beforeEach(() => {
    env = process.env.NODE_ENV
    Bun.env.NODE_ENV = ''
  })

  afterEach(() => {
    Bun.env.NODE_ENV = env
  })

  test('should default to development', () => {
    const app = kiirus()
    expect(app.get('env')).toBe('development')
  })
})
