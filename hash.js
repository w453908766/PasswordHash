
let md5 = require('js-md5')

export function convert(text) {
  let hash = md5(text)
  return "Aa0=" + hash.substr(0, 8)
}