import { FieldRule } from '../rule'
import { FileData } from '../type'
import { genKey } from '@/components/utils'

export class FieldImguploadDefinition {
  type = 'imgupload'
  key: string = genKey()
  name = '图片'
  model: string = 'imgupload_' + genKey()
  options: FieldImguploadOptions = new FieldImguploadOptions()
  rules?: FieldRule;
}

export class FieldImguploadOptions {
  disabled = false
  action = 'http://localhost:3000/form/uploadFile'
  limit = 8
  defaultValue: FileData[] = []
  required = false
}
