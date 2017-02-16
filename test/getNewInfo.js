'use strict'

const proxyquire = require('proxyquire')
const assert = require('assert')
const fs = require('fs')
const path = require('path')


describe('getNewInfo', () => {
  describe('when last power is lovetest', () => {
    const requestStub = (uri, cb) => {
      fs.readFile(path.join(__dirname, './getNewInfo.json'), (err, res) => {
        if (err) {
          throw new Error('Invalid test: file required')
        }

        cb(null, {}, res.toString('utf8'))
      })
    }

    const xatapi = proxyquire('../source/xat', { request: requestStub })

    it('should properly parse it', (done) => {
      xatapi.getNewInfo((err, res) => {
        assert.equal(null, err)
        assert.equal(427, res.id)
        assert.equal('lovetest', res.name)
        assert.equal('LIMITED', res.status)
        assert.deepEqual(['lovetest'], res.topsh)
        assert.deepEqual(['ht'], res.pawns)

        done()
      })
    })
  })

  describe('when request returns error', () => {

    const error = new Error('')
    const requestStub = (uri, cb) => {
      setImmediate(() => {
        cb(error)
      })
    }

    const xatapi = proxyquire('../source/xat', { request: requestStub })

    it('should pass this error to caller', (done) => {
      xatapi.getNewInfo((err, res) => {
        assert.equal(error, err)
        done()
      })
    })
  })
})
