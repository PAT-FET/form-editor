import { FieldRule, FileData } from '@/components/type/core'
import { genKey } from '@/components/utils'
import { 
  FieldDefinition,
  FieldHtmlDefinition,
  FieldImguploadDefinition,
  FieldInputDefinition,
  FieldSelectDefinition,
  FieldTextDefinition,
  FieldTextareaDefinition 
} from '.'

export type TableColumn = FieldDefinition |
  FieldHtmlDefinition |
  FieldImguploadDefinition |
  FieldInputDefinition |
  FieldSelectDefinition |
  FieldTextDefinition |
  FieldTextareaDefinition

export class FieldTableDefinition {
  type = 'table'
  key: string = genKey()
  name = '表格'
  model: string = 'table_' + genKey()
  options: FieldTableOptions = new FieldTableOptions()
  tableColumns: TableColumn[] = []
  rules?: FieldRule[] = []
}

export class FieldTableOptions {
  disabled = false
  hidden = false
  required = false
  defaultValue = []
  minWidth = 120
}
