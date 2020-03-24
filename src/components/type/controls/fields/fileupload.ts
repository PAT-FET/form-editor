import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'

export class FieldFileuploadDefinition {
  type = 'fileupload'
  key: string = genKey()
  name = '文件'
  model: string = 'fileupload_' + genKey()
  options: FieldFileuploadOptions = new FieldFileuploadOptions()
  rules?: FieldRule[];
}

export class FieldFileuploadOptions {
  disabled = false
  action = 'http://localhost:3000/form/uploadFile'
  limit = 8
  tip = ''
  defaultValue: FileData[] = []
  required = false
}
