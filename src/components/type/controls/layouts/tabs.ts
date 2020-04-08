import { FieldDefinition } from '../fields'
import { genKey } from '@/components/utils'
import { GridDefinition } from './grid'

export class TabsDefinition {
  type = 'tabs'
  key: string = genKey()
  name = '标签页'
  tabs: Tab[] = [new Tab()]
  options: TabsOptions = new TabsOptions()
}

export class Tab {
  label: string = 'Tab 1'
  list: Array<FieldDefinition | GridDefinition | TabsDefinition> = []
}

export class TabsOptions {
  hidden = false
  type: '' | 'card' | 'border-card' = ''
  tabPosition: 'top' | 'bottom' | 'left' | 'right' = 'top'
}
