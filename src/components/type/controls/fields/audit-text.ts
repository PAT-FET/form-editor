import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'

export class FieldAuditTextDefinition {
  type = 'audit-text'
  key: string = genKey()
  name = '审批文本'
  model: string = 'audit-text_' + genKey()
  options: FieldAuditTextOptions = new FieldAuditTextOptions()
  rules?: FieldRule[] = []
}

export class FieldAuditTextOptions {
  disabled = false
  hidden = false
  defaultValue = null
  required = false
  markable = true
}
