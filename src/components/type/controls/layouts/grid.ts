import { FieldDefinition } from '../fields'
import { genKey } from '@/components/utils'

export class GridDefinition {
  type = 'grid'
  key: string = genKey()
  name = '栅格布局'
  columns: GridColumn[] = [new GridColumn(), new GridColumn()]
  options: GridOptions = new GridOptions()
}

export class GridColumn {
  span = 12
  list: Array<FieldDefinition | GridDefinition> = []
}

export class GridOptions {
  hidden = false
  gutter = 0
}
