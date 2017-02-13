'use strict'

const assert = require('assert')
const xatapi = require('../source/xat')

const users = [
{
  id: 42,
  reg: 'Xat',
},
{
  id: 110110,
  reg: 'SlOom',
}]

describe('getRegname', () => {
  for (const user of users) {
    it(`should return regname of ${user.id}`, (done) => {
      xatapi.getRegname(user.id, (err, res) => {
        assert.equal(user.reg.toLowerCase(), res.toLowerCase())
        done()
      })
    })
  }

  it('should fail on non-number arg', (done) => {
    xatapi.getRegname('foo', (err, res) => {
      assert(err.message.indexOf('numeric') >= 0)
      done()
    })
  })

  it("should fail when id doesn't exists", (done) => {
    xatapi.getRegname(2000000000, (err, res) => {
      assert(err.message.indexOf('found') >= 0)
      done()
    })
  })
})

describe('getID', () => {
  for (const user of users) {
    it(`should return id of ${user.reg}`, (done) => {
      xatapi.getID(user.reg, (err, res) => {
        assert.equal(user.id, res)
        done()
      })
    })
  }

  it("should fail when regname doesn't exists", (done) => {
    xatapi.getID('xx', (err, res) => {
      const message = err.message
      assert(message.indexOf('found') >= 0)
      done()
    })
  })

  for (const user of users) {
    it(`should be case insensitive for ${user.reg}`, (done) => {
      xatapi.getID(user.reg.toLowerCase(), (err, res) => {
        assert.equal(user.id, res)
        done()
      })
    })
  }
})
