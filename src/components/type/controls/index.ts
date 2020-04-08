import { FieldDefinition , FieldOptions} from './fields'
import { LayoutDefinition, LayoutOptions } from './layouts'

export * from './fields'
export * from './layouts'

export type ControlDefinition = FieldDefinition | LayoutDefinition

export type ControlOptions = FieldOptions | LayoutOptions