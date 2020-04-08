export * from './grid'
export * from './tabs'

import { GridDefinition, GridOptions} from './grid'
import { TabsDefinition, TabsOptions} from './tabs'

export type LayoutDefinition = GridDefinition | TabsDefinition

export type LayoutOptions = GridOptions | TabsOptions