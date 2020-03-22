import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'

export class FieldInputDefinition {
  type = 'input'
  key: string = genKey()
  name = '单文本框'
  model: string = 'input_' + genKey()
  options: FieldInputOptions = new FieldInputOptions()
  rules?: FieldRule
}

export class FieldInputOptions {
  disabled = false
  dataType: 'string' | 'email' = 'string'
  defaultValue = ''
  required = false
  pattern = ''
  placeholder = ''
}
