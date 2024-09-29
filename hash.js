
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

export async function convert(text) {
  let arr = await deriveKey(text, "PasswordHash", 1000000, 128)

  let A = "A".charCodeAt(0) + arr[12] % 26
  let a = "a".charCodeAt(0) + arr[13] % 26
  let num = "0".charCodeAt(0) + arr[14] % 10
  let sym = arr[15] % 2 ? '/' : '+'

  let base64String = btoa(String.fromCharCode.apply(null, arr))
  return String.fromCharCode(A, a, num) + sym + base64String.slice(0, 12)
}
