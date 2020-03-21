import { ControlDefinition } from '../type'

let idx = 10000

export function genKey () {
  return Date.now() + '' + (idx++) + 10000
}

export function cloneControlDef (def: ControlDefinition) {
  const ret: ControlDefinition = JSON.parse(JSON.stringify(def))
  ret.key = genKey()
  if ((ret as any).model !== undefined) (ret as any).model = ret.type + '_' + genKey()
  return ret
}
