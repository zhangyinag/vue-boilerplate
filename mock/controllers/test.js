const Controller = require('../Controller')
const Mapping = require('../Mapping')
const RespError = require('../RespError')

module.exports = class test extends Controller {
  @Mapping({url: '/test', method: 'get'})
  get (req, res) {
    return [{
      name: 'Vue',
      author: 'You'
    }]
  }

  @Mapping({url: '/test/async'})
  async getAsync (req, res) {
    let data = await getData()
    return data
    function getData () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            name: 'Vue',
            author: 'You',
            async: true
          })
        }, 3000)
      })
    }
  }

  @Mapping({url: '/test/error/unhandled'})
  error (req, res) {
    throw new RespError('900000', '验证失败', {name: 'alison'})
  }
  @Mapping({url: '/test/error/other'})
  error (req, res) {
    throw new Error('unhandled error')
  }
  @Mapping({url: '/test/error/async'})
  async errorSync (req, res) {
    let data = await getData()
    return data
    function getData () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new RespError('800000', '异步验证失败', {async: true}))
        }, 3000)
      })
    }
  }
}
