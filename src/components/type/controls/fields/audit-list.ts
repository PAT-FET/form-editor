import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'
import { FieldDefinition, GridDefinition, TabsDefinition } from '..'

export class FieldAuditListDefinition {
  type = 'audit-list'
  key: string = genKey()
  name = '审批列表'
  model: string = 'audit-list_' + genKey()
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
