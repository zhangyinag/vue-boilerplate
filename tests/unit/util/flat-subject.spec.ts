import { expect, assert } from 'chai'
import {getFlatSubject} from '@/util/flat-subject'

describe('flatSubject', () => {
  it('should always get the latest one', (done) => {
    const flatSubject = getFlatSubject<number>()
    flatSubject.fire(mockHttp(1))
    flatSubject.fire(mockHttp(2))
    flatSubject.fire(mockHttp(3))
    flatSubject.fire(mockHttp(4))
    flatSubject.subscribe((data) => {
      console.log(data)
      assert.equal(data, 5) // why not have exception ???
    })

    setTimeout(() => {
      done()
    }, 1500)

    function mockHttp (num: number): Promise<number> {
      return new Promise((resolve, reject) => {
        let delay = Math.floor(Math.random() * 1000)
        setTimeout(() => {
          resolve(num)
        }, delay)
      })
    }
  })
})
