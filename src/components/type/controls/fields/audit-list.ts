import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'
import { FieldDefinition, GridDefinition, TabsDefinition } from '..'

export class FieldAuditListDefinition {
  type = 'audit-list'
  key: string = genKey()
  name = '审批卡片'
  model: string = 'audit_list_' + genKey()
  list: Array<FieldDefinition | GridDefinition | TabsDefinition> = []
  options: FieldAuditListOptions = new FieldAuditListOptions()
  rules?: FieldRule[] = []
}

export class FieldAuditListOptions {
  disabled = false
  hidden = false
  required = false
  defaultValue = []
}
