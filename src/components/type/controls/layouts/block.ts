import { FieldDefinition } from '../fields'
import { genKey } from '@/components/utils'
import { LayoutDefinition } from '.'

export class BlockDefinition {
  type = 'block'
  key: string = genKey()
  name = '区块'
  list: Array<FieldDefinition | LayoutDefinition> = []
  options: BlockOptions = new BlockOptions()
}

export class BlockOptions {
  hidden = false
}
