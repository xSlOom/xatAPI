'use strict'

const API_PATH = '../source/xat'

const assert = require('assert')
const fs = require('fs')
const url = require('url')
const path = require('path')

const proxyquire = require('proxyquire')

const xatapi = require(API_PATH)

// Makes a stub for xatapi's dependency - request.
// Returns fake request module.
// Argument: request handler. Handler expected to take two arguments:
// options and callback.
//
// Options contains only "uri" field.
// Callback excepts two arguments: error and body (unline request's callbacks,
// which expected to take three args: err, res, body.
//
// In fact, this function adapts simple callback to be a request-like module.
// In the future, it may become required to pass non-empty "res" to cb.
// In the future, we may find suitable to pass other things besides "uri"
// to handler.
// In the future, xatapi may rely on asynchrony of "request" module, that's why
// this setImmediate thing put there.
const makeRequestStub = (handler) => (uri, cb) => {
  setImmediate(() => handler({ uri }, (err, body) => cb(err, {}, body)))
}

// Note: callback expected to take only one argument.
// There is no need to handle errors. if file is absent, test is corrupted.
const getFile = (relativeFileName, cb) => {
  const fileName = path.join(__dirname, relativeFileName)
  fs.readFile(fileName, (err, res) => {
    if (err) {
      throw err
    }

    cb(res)
  })
}

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

  it("shouldn't be synchronous", (done) => {
    let state = 1
    xatapi.getRegname('foo', (err, res) => {
      assert.equal(2, state)
      done()
    })

    state = 2
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

describe('getChatInfo', () => {
  const chats = [{
    name: 'chat',
    id: 123,
  }, {
    name: 'xat123',
    id: 123,
  }, {
    name: '123',
    id: 2582056,
  }]

  const persistentChat = {
    id: 218938818,
    name: '13372281',
    desc: 'nothing special, just numerical',
    background: 'http://xat.com/web_gear/background/xat_stars.jpg',
    language: null,
    radio: null,
    buttons: null,
  }

  for (const chat of chats) {
    it(`should return info about group ${chat.name}`, (done) => {
      xatapi.getChatInfo(chat.name, (err, res) => {
        assert.equal(chat.id, res.id)
        done()
      })
    })
  }

  it('should fetch appropriate info about just created group', (done) => {
    xatapi.getChatInfo(persistentChat.name, (err, res) => {
      assert.equal(persistentChat.id, res.id)
      assert.equal(persistentChat.desc, res.Desc)
      assert.equal(persistentChat.name, res.Name)
      assert.equal(persistentChat.background, res.Cinfo.Background)
      assert.equal(persistentChat.language, res.Cinfo.Language)
      assert.equal(persistentChat.radio, res.Cinfo.Radio)
      assert.equal(persistentChat.buttons, res.Cinfo.Buttons)
      done()
    })
  })
})

describe('getNewInfo', () => {
  it('should return correct result when last power is lovetest', (done) => {
    const request = makeRequestStub(({ uri }, cb) => {
      getFile('./getNewInfo.json', (res) => {
        cb(null, res.toString('utf8'))
      })
    })

    const xatapi = proxyquire(API_PATH, { request })

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

  it('should pass this error to caller when request returns error', (done) => {

    const error = new Error('')
    const request = makeRequestStub((options, cb) => cb(error))

    const xatapi = proxyquire(API_PATH, { request })

    xatapi.getNewInfo((err, res) => {
      assert.equal(error, err)
      done()
    })
  })
})

describe('getChatConnection', () => {
  it('should return correct result when getting '
    + 'connection info of chat 123', (done) => {
    getFile('./illuxat-chatconnexion-123.json', (res) => {
      const json = JSON.parse(res)

      const request = makeRequestStub(({ uri }, cb) => {
        assert.equal(json.id, url.parse(uri, true).query.roomid)

        cb(null, JSON.stringify(json))
      })

      const xatapi = proxyquire(API_PATH, { request })

      xatapi.getChatConnection(123, (err, res) => {
        assert.equal(null, err)

        assert.equal(json.ip, res.ip)
        assert.equal(json.port, res.port)
        assert.equal(json.ctout, res.timeout)

        done()
      })
    })
  })
})
