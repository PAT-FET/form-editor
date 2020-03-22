import { ControlDefinition } from '@/components/type'

let idx = 10000

export function genKey () {
  idx += 1
  return Date.now() + '' + idx
}

export function cloneControlDef (def: ControlDefinition) {
  const ret: ControlDefinition = JSON.parse(JSON.stringify(def))
  ret.key = genKey()
  if ((ret as any).model !== undefined) (ret as any).model = ret.type + '_' + genKey()
  return ret
}

export function download (url: string, name: string) {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', name)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link) // 下载完成移除元素
  window.URL.revokeObjectURL(url) // 释放掉blob对象
}
