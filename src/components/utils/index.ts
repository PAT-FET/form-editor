import { FieldLatticeDefinition } from './../type/controls/fields/lattice'
import { ControlDefinition, GridDefinition, TabsDefinition, BlockDefinition, FieldTableDefinition, FieldAuditListDefinition } from '@/components/type'
import config from '../config'

let idx = 10000

export function genKey () {
  idx += 1
  return Date.now() + '' + idx
}

export function cloneControlDef (def: ControlDefinition) {
  const ret: ControlDefinition = JSON.parse(JSON.stringify(def))
  traverse(ret)
  if ((ret as any).model !== undefined) (ret as any).model = (ret.type || '').replace('-', '_') + '_' + genKey()
  return ret

  function traverse (obj: Record<string | number, any>) {
    if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') return
    Object.entries(obj || {}).forEach(([k, v]) => {
      if (['model', 'key'].includes(k)) {
        obj[k] = genKey()
      }
      if (Array.isArray(v)) {
        v.forEach(w => traverse(w))
      }
      traverse(v)
    })
  }
}

export function findList (list: ControlDefinition[], item: ControlDefinition) {
  let ret: any = null
  list.some(v => {
    if (v === item) {
      ret = list
      return true
    }
    if (['grid'].includes(v.type)) {
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
    if (v.type === 'audit-list') {
      const r = findList((v as FieldAuditListDefinition).list, item)
      if (r) {
        ret = r
        return true
      }
    }
    if (['lattice'].includes(v.type)) {
      const has = (v as FieldLatticeDefinition).columns.some(w => {
        let r
        ;(w || []).some(u => {
          const s = findList((u as any)?.list, item)
          if (s) {
            r = s
            return true
          }
        })
        if (r) {
          ret = r
          return true
        }
      })
      if (has) return true
    }
    return false
  })
  return ret
}

export function isEmbedType (type: string) {
  return ['grid', 'tabs', 'block', 'table'].includes(type)
}

const tableType = ['input', 'textarea', 'select', 'text', 'html', 'fileupload', 'imgupload', 'audit-file', 'audit-text']
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

export function isOffice (url: string) {
  const names = ['doc', 'docx', 'xls', 'xlsx', 'cvs', 'ppt', 'pptx']
  const path = new URL(url).pathname
  const suffix = path.slice(path.lastIndexOf('.') + 1) || ''
  return names.some(v => suffix.toLowerCase() === v)
}

export function isText (url: string) {
  const names = ['txt', 'yaml', 'yml', 'xml', 'json', 'md']
  const path = new URL(url).pathname
  const suffix = path.slice(path.lastIndexOf('.') + 1) || ''
  return names.some(v => suffix.toLowerCase() === v)
}

const contentTypeMap: any = {
  jpg: 'image',
  jpeg: 'image',
  svg: 'image',
  png: 'image',
  pdf: 'pdf',
  doc: 'word',
  docx: 'word',
  xls: 'excel',
  xlsx: 'excel',
  cvs: 'excel',
  ppt: 'ppt',
  pptx: 'ppt'
}

export function getFileType (name: string): 'pdf' | 'image' | 'word' | 'excel' | 'ppt' | 'other' {
  const suffix = (name.substr(name.lastIndexOf('.') + 1) || '').toLowerCase()
  return contentTypeMap[suffix] || 'unknown'
}

export function previewPdf (url: string) {
  window.open(url)
}

export function previewOffice (url: string) {
  // http://view.officeapps.live.com/op/view.aspx 官方
  const server = config?.officeUrl
  window.open(`${server}?src=${url}`)
}

export function downloadFile (name: string, url: string) {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', name)
  link.setAttribute('target', '_blank')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
