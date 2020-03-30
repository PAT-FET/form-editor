import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'

export class FieldTextDefinition {
  type = 'text'
  key: string = genKey()
  name = '文字'
  model: string = 'text_' + genKey()
  options: FieldTextOptions = new FieldTextOptions()
  rules?: FieldRule[] = []
}

export class FieldTextOptions {
  disabled = false
  hidden = false
  defaultValue = ''
  required = false
}
