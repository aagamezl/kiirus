/**
 * Represents a client request with associated information.
 *
 * @class
 * @classdesc
 * The `ClientRequest` class is used to encapsulate information related to a client request.
 *
 * @name ClientRequest
 *
 * @param {Request} request - The request object associated with the client request.
 * @param {string} path - The path associated with the client request.
 *
 * @property {Object.<string, unknown>} body - The body of the client request. It is initially set to `undefined`.
 * @property {string} path - The path associated with the client request.
 * @property {Request} raw - The raw request object associated with the client request.
 *
 * @example
 * const request = new Request();
 * const path = '/api/data';
 * const clientRequest = new ClientRequest(request, path);
 * clientRequest.body = { key: 'value' };
 * console.log(clientRequest.path); // '/api/data'
 * console.log(clientRequest.raw); // [Request object]
 */
export default class ClientRequest {
  /**
   * @constructor
   * @param {Request} request
   * @param {string} path
   */
  constructor (request, path) {
    /** @type Object.<string, unknown> */
    this.body = undefined
    this.path = path
    this.raw = request
  }

  get headers () {
    // TODO Evaluate if is more performance to store this headers object in the ClientRequest object
    return Object.fromEntries(this.raw.headers.entries())
  }
}
