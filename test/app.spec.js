import { describe, expect, test } from 'bun:test'

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

  test.skip('app should 404 without routes', async () => {
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
