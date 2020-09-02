import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'

export interface AuditDiffRow {
  name: string
  label: string
}

export interface AuditDiffCol {
  name: string
  label: string
}

export class FieldAuditDiffDefinition {
  type = 'audit-diff'
  key: string = genKey()
  name = '审批对比'
  model: string = 'audit-diff_' + genKey()
  rows: AuditDiffRow[] = [{ name: 'key1', label: '字段 1' }]
  cols: AuditDiffCol[] = [{ name: 'data1', label: '数据源 1' }]
  options: FieldAuditDiffOptions = new FieldAuditDiffOptions()
  rules?: FieldRule[] = []
}

export class FieldAuditDiffOptions {
  disabled = false
  hidden = false
  defaultValue = null
  required = false
}
