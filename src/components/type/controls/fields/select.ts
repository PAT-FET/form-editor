import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'

export class FieldSelectDefinition {
  type = 'select'
  key: string = genKey()
  name = '下拉选择框'
  model: string = 'select_' + genKey()
  options: FieldSelectOptions = new FieldSelectOptions()
  rules?: FieldRule[]
}

export class FieldSelectOptions {
  disabled = false
  multiple = false
  clearable = false
  options: Array<{ value: string; label?: string }> = [{ value: 'Option1', label: '选项1' }, { value: 'Option2', label: '选项2' }, { value: 'Option3', label: '选项3' }]
  defaultValue: string | string[] = ''
  required = false
  placeholder = ''
}
