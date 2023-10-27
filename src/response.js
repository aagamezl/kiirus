import { ServerResponse } from 'node:http'

import { getCharset, getContentType } from './utils/getContentType.js'

const charsetRegExp = /;\s*charset\s*=/

const setCharset = (contentType, charset) => {
  return `${contentType}; ${charset}`
}

const CONTENT_TYPE = {
  JSON: 'application/json; charset=utf-8',
  PLAIN: 'text/plain; charset=utf-8',
  OCTET: 'application/octet-stream'
}

class Response extends ServerResponse {
  constructor (req) {
    super(req)

    // TODO: Find a better solution to this
    req.socket._httpMessage = null

    this.assignSocket(req.socket)
    this.socket = req.socket
  }

  /**
   * Get the value of a response header.
   * @function
   * @param {string} field - The name of the header.
   * @returns {string|undefined} The value of the header or undefined if not set.
   */
  get (field) {
    return this.getHeader(field)
  }

  /**
   * Send a JSON response
   * @function
   * @param {object} [body] - The JSON data to send in the response
   * @returns {object} The Express Response object.
   */
  json (body) {
    if (!this.get('Content-Type')) {
      this.set('Content-Type', CONTENT_TYPE.JSON)
    }

    return this.end(JSON.stringify(body))
  }

  /**
   * Send a response
   * @function
   * @param {string|Buffer|object} [body] - The data to send in the response
   */
  send (body) {
    // let encoding

    if (this.req.method === 'HEAD') {
      // skip body for HEAD
      this.end()

      return this
    }

    switch (typeof body) {
      // string defaulting to html
      case 'string': {
        // encoding = 'utf8'
        // const contentType = this.get('Content-Type') ?? 'html'

        // this.set('Content-Type', setCharset(contentType, encoding))
        this.set('Content-Type', setCharset(this.get('Content-Type') ?? 'html', 'utf8'))

        break
      }

      case 'boolean':
      case 'number':
      case 'object':
        if (body === null) {
          body = ''
        } else if (Buffer.isBuffer(body)) {
          if (!this.get('Content-Type')) {
            this.type('bin')
          }
        } else {
          return this.json(body)
        }

        break
    }

    // determine if ETag should be generated
    // const etagFn = app.get('etag fn')
    // const generateETag = !this.get('ETag') && typeof etagFn === 'function'

    // populate Content-Length
    let len
    if (body !== undefined) {
      if (Buffer.isBuffer(body)) {
        // get length of Buffer
        len = body.length
      } else if (/* !generateETag && */ body.length < 1000) {
        // just calculate length when no ETag + small body
        // len = Buffer.byteLength(body, encoding)
        // len = Buffer.byteLength(body, 'utf8')
      } else {
        // convert body to Buffer and calculate
        // body = Buffer.from(body, encoding)
        body = Buffer.from(body, 'utf8')
        // encoding = undefined
        len = body.length
      }

      this.set('Content-Length', len)
    }

    // populate ETag
    // let etag
    // if (generateETag && len !== undefined) {
    //   if ((etag = etagFn(chunk, encoding))) {
    //     this.set('ETag', etag)
    //   }
    // }

    // freshness
    if (this.req.fresh) {
      this.statusCode = 304
    }

    // strip irrelevant headers
    if (this.statusCode === 204 || this.statusCode === 304) {
      this.removeHeader('Content-Type')
      this.removeHeader('Content-Length')
      this.removeHeader('Transfer-Encoding')
      body = ''
    }

    // alter headers for 205
    if (this.statusCode === 205) {
      this.set('Content-Length', '0')
      this.removeHeader('Transfer-Encoding')
      body = ''
    }

    // respond
    this.end(body, encoding)

    return this
  }

  /**
   * Set response headers.
   * @function
   * @param {string|object} field - The header field name or an object of header fields.
   * @param {string|string[]} [value] - The value to set for the specified field.
   * @returns {object} The Express Response object.
   */
  set (field, val) {
    let value = Array.isArray(val) ? val.map(String) : String(val)

    // add charset to content-type
    if (field.toLowerCase() === 'content-type') {
      if (Array.isArray(value)) {
        throw new TypeError('Content-Type cannot be set to an Array')
      }

      if (!charsetRegExp.test(value)) {
        const charset = getCharset(value.split(';')[0])

        if (charset) {
          value = `${value}; charset=${charset.toLowerCase()}`
        }
      }

      this.setHeader(field, value)
    }

    return this
  }
}

export default Response

// this.get = (field) => {
//   return this.getHeader(field)
// }

// /**
//  * Send a JSON response
//  * @function
//  * @param {object} [body] - The JSON data to send in the response
//  * @returns {object} The Express Response object.
//  */
// this.json = (body) => {
//   // content-type
//   if (!response.get('Content-Type')) {
//     response.set('Content-Type', 'application/json; charset=UTF-8')
//   }

//   return response.send(JSON.stringify(body))
// }

/**
 * Create an Express Response object.
 * @param {object} res - The HTTP response object.
 * @returns {object} An Express Response object.
 */
// const response = {
//   /**
//    * Reference to the Express application that is processing response response
//    * @type {object}
//    * @name res.app
//    * @memberOf mocaccino.Response
//    */

//   /**
//    * Indicates whether the response headers have been sent to the client.
//    * @type {boolean}
//    * @name res.headersSent
//    * @memberOf mocaccino.Response
//    */

//   /**
//    * Application local variables.
//    * @type {object}
//    * @name res.locals
//    * @memberOf mocaccino.Response
//    */

//   /**
//    * Append additional values to the response's headers.
//    * @function
//    * @param {string|object} field - The field name or an object of header fields to append.
//    * @param {string|string[]} [value] - The value to append to the specified field.
//    * @returns {object} The Express Response object.
//    */
//   append: (field, value) => {
//     // Implementation here
//   },

//   /**
//    * Set the "Content-Disposition" header to suggest a filename for the response
//    * @function
//    * @param {string} [filename] - The suggested filename.
//    * @returns {object} The Express Response object.
//    */
//   attachment: (filename) => {
//     // Implementation here
//   },

//   /**
//    * Set a cookie on the response
//    * @function
//    * @param {string} name - The name of the cookie.
//    * @param {string|object} value - The value of the cookie or an object of cookie options.
//    * @returns {object} The Express Response object.
//    */
//   cookie: (name, value) => {
//     // Implementation here
//   },

//   /**
//    * Clear a cookie on the response
//    * @function
//    * @param {string} name - The name of the cookie.
//    * @param {object} [options] - Cookie options for clearing.
//    * @returns {object} The Express Response object.
//    */
//   clearCookie: (name, options) => {
//     // Implementation here
//   },

//   /**
//    * Trigger a file download by setting the "Content-Disposition" header.
//    * @function
//    * @param {string} path - The path to the file to be downloaded.
//    * @param {string} [filename] - The filename to suggest to the client.
//    * @param {function} [callback] - A callback function to handle the response end.
//    */
//   download: (path, filename, callback) => {
//     // Implementation here
//   },

//   /**
//    * Format the response according to the given content negotiation object.
//    * @function
//    * @param {object} obj - A content negotiation object.
//    * @returns {object} The Express Response object.
//    */
//   format: (obj) => {
//     // Implementation here
//   },

//   /**
//    * Get the value of a response header.
//    * @function
//    * @param {string} field - The name of the header.
//    * @returns {string|undefined} The value of the header or undefined if not set.
//    */
//   get: (field) => {
//     return response.getHeader(field)
//   },

//   /**
//    * Send a JSON response
//    * @function
//    * @param {object} [body] - The JSON data to send in the response
//    * @returns {object} The Express Response object.
//    */
//   json: (body) => {
//     // content-type
//     if (!response.get('Content-Type')) {
//       response.set('Content-Type', 'application/json; charset=UTF-8')
//     }

//     return response.send(JSON.stringify(body))
//   },

//   /**
//    * Send a JSONP response
//    * @function
//    * @param {object} [body] - The JSONP data to send in the response
//    * @returns {object} The Express Response object.
//    */
//   jsonp: (body) => {
//     // Implementation here
//   },

//   /**
//    * Set multiple links in the response Link header field.
//    * @function
//    * @param {object} links - An object containing link key-value pairs.
//    * @returns {object} The Express Response object.
//    */
//   links: (links) => {
//     // Implementation here
//   },

//   /**
//    * Set the response's location header.
//    * @function
//    * @param {string} path - The value to set as the location header.
//    * @returns {object} The Express Response object.
//    */
//   location: (path) => {
//     // Implementation here
//   },

//   /**
//    * Redirect the client to a different URL.
//    * @function
//    * @param {string} url - The URL to redirect to.
//    * @param {number} [statusCode] - The HTTP status code to use for the redirect (default: 302).
//    */
//   redirect: (url, statusCode) => {
//     // Implementation here
//   },

//   /**
//    * Render a view template and send it as the response
//    * @function
//    * @param {string} view - The name of the view template to render.
//    * @param {object} [locals] - Local variables to be passed to the view.
//    * @param {function} [callback] - A callback function to handle the response end.
//    */
//   render: (view, locals, callback) => {
//     // Implementation here
//   },

//   /**
//    * Send a response
//    * @function
//    * @param {string|Buffer|object} [body] - The data to send in the response
//    */
//   send: (body) => {
//     let encoding

//     if (response.req.method === 'HEAD') {
//       // skip body for HEAD
//       response.end()

//       return response
//     }

//     switch (typeof body) {
//       // string defaulting to html
//       case 'string':{
//         encoding = 'utf8'
//         const contentType = response.get('Content-Type') ?? 'html'

//         response.set('Content-Type', setCharset(contentType, encoding))

//         break
//       }
//       case 'boolean':
//       case 'number':
//       case 'object':
//         if (body === null) {
//           body = ''
//         } else if (Buffer.isBuffer(body)) {
//           if (!response.get('Content-Type')) {
//             response.type('bin')
//           }
//         } else {
//           return response.json(body)
//         }

//         break
//     }

//     // determine if ETag should be generated
//     // const etagFn = app.get('etag fn')
//     // const generateETag = !this.get('ETag') && typeof etagFn === 'function'

//     // populate Content-Length
//     let len
//     if (body !== undefined) {
//       if (Buffer.isBuffer(body)) {
//         // get length of Buffer
//         len = body.length
//       } else if (/* !generateETag && */ body.length < 1000) {
//         // just calculate length when no ETag + small body
//         len = Buffer.byteLength(body, encoding)
//       } else {
//         // convert body to Buffer and calculate
//         body = Buffer.from(body, encoding)
//         encoding = undefined
//         len = body.length
//       }

//       response.set('Content-Length', len)
//     }

//     // let etag
//     // if (generateETag && len !== undefined) {
//     //   if ((etag = etagFn(chunk, encoding))) {
//     //     response.set('ETag', etag)
//     //   }
//     // }

//     // freshness
//     if (response.req.fresh) {
//       response.statusCode = 304
//     }

//     // strip irrelevant headers
//     if (response.statusCode === 204 || response.statusCode === 304) {
//       response.removeHeader('Content-Type')
//       response.removeHeader('Content-Length')
//       response.removeHeader('Transfer-Encoding')
//       body = ''
//     }

//     // alter headers for 205
//     if (response.statusCode === 205) {
//       response.set('Content-Length', '0')
//       response.removeHeader('Transfer-Encoding')
//       body = ''
//     }

//     // respond
//     response.end(body, encoding)

//     return response
//   },

//   /**
//    * Send a file as an octet stream.
//    * @function
//    * @param {string} path - The path to the file to be sent.
//    * @param {object} [options] - Options for sending the file.
//    * @param {function} [callback] - A callback function to handle the response end.
//    */
//   sendFile: (path, options, callback) => {
//     // Implementation here
//   },

//   /**
//    * Send an HTTP status code as a response
//    * @function
//    * @param {number} statusCode - The HTTP status code to send.
//    */
//   sendStatus: (statusCode) => {
//     // Implementation here
//   },

//   /**
//    * Set response headers.
//    * @function
//    * @param {string|object} field - The header field name or an object of header fields.
//    * @param {string|string[]} [value] - The value to set for the specified field.
//    * @returns {object} The Express Response object.
//    */
//   set: (field, val) => {
//     let value = Array.isArray(val) ? val.map(String) : String(val)

//     // add charset to content-type
//     if (field.toLowerCase() === 'content-type') {
//       if (Array.isArray(value)) {
//         throw new TypeError('Content-Type cannot be set to an Array')
//       }

//       if (!charsetRegExp.test(value)) {
//         const charset = getCharset(value.split(';')[0])

//         if (charset) {
//           value = `${value}; charset=${charset.toLowerCase()}`
//         }
//       }

//       response.setHeader(field, value)
//     }

//     return response
//   },

//   /**
//    * Set the HTTP status code for the response
//    * @function
//    * @param {number} code - The HTTP status code to set.
//    * @returns {object} The Express Response object.
//    */
//   status: (code) => {
//     response.statusCode = code

//     return response
//   },

//   /**
//    * Set the content type for the response
//    * @function
//    * @param {string} type - The content type to set (e.g., 'text/plain', 'application/json').
//    * @returns {object} The Express Response object.
//    */
//   type: (type) => {
//     const contentType = type.indexOf('/') === -1 ? getContentType(type) : type

//     return this.set('Content-Type', contentType)
//   },

//   /**
//    * Add values to the "Vary" response header to specify which headers to consider when evaluating cache.
//    * @function
//    * @param {string|string[]} field - The field name(s) to add to the "Vary" header.
//    * @returns {object} The Express Response object.
//    */
//   vary: (field) => {
//     // Implementation here
//   }
// }

// export default response
