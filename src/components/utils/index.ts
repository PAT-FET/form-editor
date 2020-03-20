let idx = 10000

export function genKey () {
  return Date.now() + '' + (idx++) + 10000
}
