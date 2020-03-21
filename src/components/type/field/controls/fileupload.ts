import { FieldRule } from '../rule'
import { FileData } from '../type'
import { genKey } from '@/components/utils'

export class FieldFileuploadDefinition {
  type = 'fileupload'
  key: string = genKey()
  name = '文件'
  model: string = 'fileupload_' + genKey()
  options: FieldFileuploadOptions = new FieldFileuploadOptions()
  rules?: FieldRule;
}

export class FieldFileuploadOptions {
  disabled = false
  action = ''
  limit = 8
  tip = ''
  defaultValue: FileData[] = []
  required = false
}
