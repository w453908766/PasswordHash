
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

function fixBase64(arr){
  let str0 = btoa(String.fromCharCode.apply(null, arr))
  let str1 = str0.replace(/[^a-zA-Z0-9]/g, '')
  const repeatCount = Math.ceil(12 / str1.length);
  return str1.repeat(repeatCount).slice(0, 12);
}

function insert(str, index, value) {
  let index1 = index % (str.length + 1)
  return str.substr(0, index1) + value + str.substr(index1);
}

export async function convert(text) {
  let arr = await deriveKey(text, "PasswordHash", 1000000, 256)

  let A = String.fromCharCode("A".charCodeAt(0) + arr[28] % 26)
  let a = String.fromCharCode("a".charCodeAt(0) + arr[29] % 26)
  let num = String.fromCharCode("0".charCodeAt(0) + arr[30] % 10)
  let sym = arr[31] % 2 ? '_' : '='

  let r0 = fixBase64(arr)
  let r1 = insert(r0, arr[28], A)
  let r2 = insert(r1, arr[29], a)
  let r3 = insert(r2, arr[30], num)
  return r3 + sym
}

// async function main(){
//   for(let i = 0; i < 100; i++){
//     console.log(await convert("text" + i))
//   }
// }
// main()