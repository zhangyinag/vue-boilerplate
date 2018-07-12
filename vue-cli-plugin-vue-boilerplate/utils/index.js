const rimraf = require('rimraf')
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
  function travel (dir, callback, last) {
    fs.readdirSync(dir).forEach(function (file) {
      let pathname = path.join(dir, file)
      let current = path.join(last || '', file)
      if (fs.statSync(pathname).isDirectory()) {
        travel(pathname, callback, current)
      } else {
        callback(current, pathname)
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
        fs.mkdirSync(dirs[i])
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

function writeJson (file, callback) {
  let text = fs.readFileSync(file, 'utf-8')
  let data = JSON.parse(text)
  let result = JSON.stringify(callback(data), null, 2)
  fs.writeFileSync(file, result, 'utf-8')
}

module.exports = {copyFiles, copyDir, delDir, writeJson}
