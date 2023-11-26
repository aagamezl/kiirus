class KiirusRequest extends Request {
  #request
  #body

  constructor (request) {
    super(request)
    this.#request = request

    // this.body = undefined

    // console.log(this.#request)
  }

  get body () {
    return this.#body
  }

  set body (data) {
    this.#body = data
  }

  // async json () {
  //   this.#body = await this.#request.json()

  //   return this.#body
  // }
}

export default KiirusRequest
