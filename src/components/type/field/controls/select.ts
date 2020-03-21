import { FieldRule } from '../rule'
import { genKey } from '@/components/utils'

export class FieldSelectDefinition {
  type = 'select'
  key: string = genKey()
  name = '下拉选择框'
  model: string = 'select_' + genKey()
  options: FieldSelectOptions = new FieldSelectOptions()
  rules?: FieldRule
}

export class FieldSelectOptions {
  disabled = false
  multiple = false
  clearable = true
  options: Array<{ value: string; label?: string }> = [{ value: 'Option1' }, { value: 'Option2' }, { value: 'Option3' }]
  defaultValue: string | string[] = ''
  required = false
  placeholder = ''
}
