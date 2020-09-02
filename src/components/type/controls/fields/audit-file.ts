import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'

export class FieldAuditFileDefinition {
  type = 'audit-file'
  key: string = genKey()
  name = '审批文件'
  model: string = 'audit-file_' + genKey()
  options: FieldAuditFileOptions = new FieldAuditFileOptions()
  rules?: FieldRule[] = []
}

export class FieldAuditFileOptions {
  disabled = false
  hidden = false
  defaultValue = null
  required = false
}
