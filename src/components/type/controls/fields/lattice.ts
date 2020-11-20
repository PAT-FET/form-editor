import { FieldRule, FileData } from '@/components/type/core'
import { FieldDefinition } from '../fields'
import { genKey } from '@/components/utils'

export class FieldLatticeDefinition {
  type = 'lattice'
  key: string = genKey()
  name = '网格'
  model: string = 'lattice_' + genKey()
  columns: FieldLatticeColumn[][] = [[new FieldLatticeColumn(), new FieldLatticeColumn()], [new FieldLatticeColumn(), new FieldLatticeColumn()]]
  options: FieldLatticeOptions = new FieldLatticeOptions()
  rules?: FieldRule[] = []
}

export class FieldLatticeColumn {
  row = 1
  col = 1
  list: Array<FieldDefinition> = []
}

export class FieldLatticeOptions {
  hidden = false
  disabled = false
  defaultValue = null
  required = false
  // gutter = 0
  // justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' = 'start'
  row = 2
  col = 2
  align: 'bottom' | 'middle' | 'top' = 'top'
}
