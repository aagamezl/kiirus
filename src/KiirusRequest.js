export default class KiirusRequest {
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
}
