import { ControlDefinition, GridDefinition, TabsDefinition, BlockDefinition, FieldTableDefinition } from '@/components/type'

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

export function findList (list: ControlDefinition[], item: ControlDefinition) {
  let ret: any = null
  list.some(v => {
    if (v === item) {
      ret = list
      return true
    }
    if (v.type === 'grid') {
      const has = (v as GridDefinition).columns.some(w => {
        const r = findList(w.list, item)
        if (r) {
          ret = r
          return true
        }
      })
      if (has) return true
    }
    if (v.type === 'tabs') {
      const has = (v as TabsDefinition).tabs.some(w => {
        const r = findList(w.list, item)
        if (r) {
          ret = r
          return true
        }
      })
      if (has) return true
    }
    if (v.type === 'block') {
      const r = findList((v as BlockDefinition).list, item)
      if (r) {
        ret = r
        return true
      }
    }
    if (v.type === 'table') {
      const r = findList((v as FieldTableDefinition).tableColumns, item)
      if (r) {
        ret = r
        return true
      }
    }
    return false
  })
  return ret
}

export function isEmbedType (type: string) {
  return ['grid', 'tabs', 'block', 'table'].includes(type)
}

const tableType = ['input', 'textarea', 'select', 'text', 'html', 'fileupload', 'imgupload']
export function isTableType (type: string) {
  return tableType.includes(type)
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

export function copyToClipboard (copyTxt: string) {
  // createInput.value = copyTxt
  document.addEventListener('copy', handler) // 增加copy监听
  document.execCommand('copy') // 执行copy命令触发监听
  document.removeEventListener('copy', handler)
  function handler (event: any) {
    event.clipboardData.setData('text/plain', copyTxt)
    event.preventDefault()
  }
}
