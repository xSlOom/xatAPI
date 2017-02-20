'use strict'
const fs = require('fs')
const path = require('path')

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
  const fileName = path.join(__dirname, '../test', relativeFileName)
  fs.readFile(fileName, (err, res) => {
    if (err) {
      throw err
    }

    cb(res)
  })
}

module.exports = {
  makeRequestStub,
  getFile,
}
