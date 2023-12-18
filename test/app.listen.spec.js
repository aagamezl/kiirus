import { describe, test } from 'bun:test'

import kiirus from '../src/kiirus.js'

describe('app.listen()', () => {
  test('should wrap with an HTTP server', () => {
    const app = kiirus()

    const server = app.listen(0, () => {
      server.close()
    })
  })
})
