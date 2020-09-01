export * from './rule'

export interface FileData {
  name: string
  url: string
  uid: number
  status: 'success'
}

export interface AuditTextData {
  oldValue?: string // 旧值
  value?: string // 新值
  remark?: string // 备注
  mark?: boolean // 标记 true - 正确  false - 错误 undefined - 未标记
}