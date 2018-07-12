const {copyFiles, copyDir, delDir} = require('./utils')
const path = require('path')

const src = '..'
const dist = './generator/template'

const resolveSrc = (dir) => path.join(__dirname, src, dir || '')
const resolveDist = (dir) => path.join(__dirname, dist, dir || '')

const mock = 'mock'
const _src = 'src'
const _public = 'public'
const vueConfig = 'vue.config.js'
const envs = '.env.development,.env.production,.env.staging'

const srcDir = resolveSrc()
const distDir = resolveDist()

module.exports = function generate () {
  console.group('Generate template : ')
  console.info(`delete dist dir : ${distDir}`)

  delDir(dist).then(() => {
    return mappingDir(mock)
  }).then(() => {
    return mappingDir(_src)
  }).then(() => {
    return mappingDir(_public)
  }).then(() => {
    return mappingFiles(vueConfig)
  }).then(() => {
    return mappingFiles(envs)
  }).then(() => {
    console.groupEnd()
  })
}

function mappingDir (name) {
  let src = resolveSrc(name)
  let dist = resolveDist(name)
  logCopy(src, dist)
  return copyDir(src, dist)
}

function mappingFiles (name) {
  let names = name.split(',')
  let src = []
  let dist = []
  names.forEach(v => {
    src.push(resolveSrc(v))
    dist.push(resolveDist(v))
  })
  logCopy(src, dist)
  return copyFiles(src, dist)
}

function logCopy (from, to) {
  console.info(`copy : from [${from}], to [${to}]`)
}
