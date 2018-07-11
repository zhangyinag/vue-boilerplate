module.exports = function transform (data, code, errMsg) {
  return {
    data: data,
    resultCode: code || '000000',
    resultMesg: errMsg
  }
}
