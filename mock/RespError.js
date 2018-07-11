class RespError extends Error {
  constructor (code, msg, data) {
    super()
    this.code = code
    this.message = msg
    this.data = data
  }
}

module.exports = RespError
