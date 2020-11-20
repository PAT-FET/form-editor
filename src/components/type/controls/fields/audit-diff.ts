import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'

export interface AuditDiffRow {
  name: string
  label: string
}

export interface AuditDiffCol {
  name: string
  label: string
  markable: boolean
}

export class FieldAuditDiffDefinition {
  type = 'audit-diff'
  key: string = genKey()
  name = '对比表单'
  model: string = 'audit_diff_' + genKey()
  rows: AuditDiffRow[] = [{ name: 'key1', label: '字段 1' }]
  cols: AuditDiffCol[] = [{ name: 'data1', label: '数据源 1', markable: false }]
  options: FieldAuditDiffOptions = new FieldAuditDiffOptions()
  rules?: FieldRule[] = []
}

export class FieldAuditDiffOptions {
  mark = true
  disabled = false
  hidden = false
  defaultValue = null
  required = false
}
