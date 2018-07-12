const rimraf = require('rimraf')
const copy = require('graceful-copy')
const fs = require('fs')
const path = require('path')

function copyFiles (src, dest) {
  let all = []
  if (typeof src === 'string') all.push(copyFile(src, dest))
  else all.push(...src.map((v, i) => copyFile(v, dest[i])))
  return Promise.all(all)
}

const copyDir = function (src, dest) {
  return new Promise((resolve, reject) => {
    travel(src, cb)
    resolve()
  })
  function travel (dir, callback, rp) {
    fs.readdirSync(dir).forEach(function (file) {
      let pathname = path.join(dir, file)
      rp = path.join(rp || '', file)
      if (fs.statSync(pathname).isDirectory()) {
        travel(pathname, callback, rp)
      } else {
        callback(rp, pathname)
      }
    })
  }
  function cb (rp) {
    let fileSrc = path.join(src, rp)
    let fileDest = path.join(dest, rp)
    let dirDest = path.dirname(fileDest)
    md(dirDest)
    copyFiles(fileSrc, fileDest)
    function md (dir) {
      if (fs.existsSync(dir)) return
      const dirs = []
      while (!fs.existsSync(dir)) {
        dirs.push(dir)
        dir = path.dirname(dir)
      }
      for (let i = dirs.length - 1; i >= 0; i--) {
        fs.mkdirSync(dir[i])
      }
    }
  }
}

const delDir = function (dir) {
  return new Promise((resolve, reject) => {
    try {
      rimraf(dir, () => {
        resolve()
      })
    } catch (e) {
      reject(e)
    }
  })
}

function copyFile (src, dest) {
  return new Promise((resolve, reject) => {
    try {
      fs.copyFile(src, dest, (err) => {
        if (err) return reject(err)
        resolve()
      })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {copyFiles, copyDir, delDir}
