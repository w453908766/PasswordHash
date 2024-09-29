
async function deriveKey(password, salt, iterations, keyLength) {
  let enc = new TextEncoder()
  let passwordBuffer = enc.encode(password)
  let saltBuffer = enc.encode(salt)

  let importedKey = await crypto.subtle.importKey(
      'raw', passwordBuffer, { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey'])

  let derivedKeyBuffer = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: saltBuffer, iterations: iterations, hash: 'SHA-256' },
      importedKey, keyLength)

  return new Uint8Array(derivedKeyBuffer)
}

function insert(str, index, value) {
  let index1 = index % (str.length + 1)
  return str.substr(0, index1) + value + str.substr(index1);
}

export async function convert(text) {
  let arr = await deriveKey(text, "PasswordHash", 1000000, 128)
  let base64String = btoa(String.fromCharCode.apply(null, arr))

  let A = String.fromCharCode("A".charCodeAt(0) + arr[12] % 26)
  let a = String.fromCharCode("a".charCodeAt(0) + arr[13] % 26)
  let num = String.fromCharCode("0".charCodeAt(0) + arr[14] % 10)
  let sym = arr[15] % 2 ? '/' : '+'

  let r0 = base64String.slice(0, 12)
  let r1 = insert(r0, arr[12], A)
  let r2 = insert(r1, arr[13], a)
  let r3 = insert(r2, arr[14], num)
  let r4 = insert(r3, arr[15], sym)

  return r4
}

// async function main(){
//   console.log(await convert("text0"))
//   console.log(await convert("text1"))
//   console.log(await convert("text2"))
//   console.log(await convert("text3"))
//   console.log(await convert("text4"))
//   console.log(await convert("text5"))
//   console.log(await convert("text6"))
// }
// main()