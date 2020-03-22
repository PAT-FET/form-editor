import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'

export class FieldTextareaDefinition {
  type = 'textarea'
  key: string = genKey()
  name = '多行文本'
  model: string = 'textarea_' + genKey()
  options: FieldTextareaOptions = new FieldTextareaOptions()
  rules?: FieldRule
}

export class FieldTextareaOptions {
  disabled = false
  defaultValue = ''
  required = false
  pattern = ''
  placeholder = ''
}
