export function ossDownload (name: string, url: string) {
  download(url, name).catch(() => {
    // eslint-disable-next-line
    console.warn('文件 [' + url + '] 不支持跨域下载')
    resp(url, name, '_blank')
  })
  // resp(url, name, '_blank')
}

export function resp (data: Blob | string, name: string, target?: string) {
  const url = typeof data === 'string' ? data : window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', name)
  // if (target) link.setAttribute('target', target)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

function getFilename (url: string) {
  const idx = url.lastIndexOf('/')
  if (idx >= 0) return url.slice(idx + 1)
}
export function download (api: string, name?: string): Promise<any> {
  // if (api.startsWith('http')) {
  //   resp(api, name || '未命名文件')
  //   return
  // }
  let _res
  const protocol = window.location.protocol
  if (protocol === 'https:') {
    _res = api.replace('http://', '/')
  } else {
    _res = api.replace('https://', '/')
  }
  const p = window.fetch(api)
  return p.then((response: any) => {
    const contentDisposition = response?.headers['content-disposition']
    const responseName = decodeURI(query('filename', contentDisposition) || query('fileName', contentDisposition))
    if (!name) name = responseName || getFilename(api) || 'unknown'
    response.blob().then((b: any) => {
      resp(b, name as any)
    })
  })

  function query (key: string, path: string) {
    const keyword = `${key}=`
    const ret = (path || '').split(';')
    const target = ret.find(v => {
      return v.trim().startsWith(keyword)
    })
    if (target) return target.trim().replace(keyword, '')
    return ''
  }
}
