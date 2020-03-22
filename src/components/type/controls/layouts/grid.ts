import { FieldDefinition } from '../fields'
import { genKey } from '@/components/utils'

export class GridDefinition {
  type = 'grid'
  key: string = genKey()
  name = '栅格布局'
  columns: GridOptions[] = [new GridOptions(), new GridOptions()]
}

export class GridOptions {
  span = 12
  list: FieldDefinition[] = []
}
