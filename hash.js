
let md5 = require('js-md5')

export function convert(text) {
  let text1 = "PasswordHash" + text
  let hash = md5.base64(text1)
  let arr = md5.array(text1)
  let A = "A".charCodeAt(0) + arr[12] % 26
  let a = "a".charCodeAt(0) + arr[13] % 26
  let num = "0".charCodeAt(0) + arr[14] % 10
  let sym = arr[15] % 2 ? '/' : '+'

  return String.fromCharCode(A, a, num) + sym + hash.substr(0, 8)
}
