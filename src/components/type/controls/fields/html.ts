import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'

export class FieldHtmlDefinition {
  type = 'html'
  key: string = genKey()
  name = 'HTML'
  model: string = 'html_' + genKey()
  options: FieldHtmlOptions = new FieldHtmlOptions()
  rules?: FieldRule[] = []
}

export class FieldHtmlOptions {
  disabled = false
  hidden = false
  defaultValue = `<b style="color: red;">This is a HTML5</b>`
  template = '<slot></slot>'
  required = false
}
