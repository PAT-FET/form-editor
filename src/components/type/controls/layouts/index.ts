export * from './grid'
export * from './tabs'
export * from './block'

import { GridDefinition, GridOptions} from './grid'
import { TabsDefinition, TabsOptions} from './tabs'
import { BlockDefinition, BlockOptions} from './block'

export type LayoutDefinition = GridDefinition | TabsDefinition | BlockDefinition

export type LayoutOptions = GridOptions | TabsOptions | BlockOptions