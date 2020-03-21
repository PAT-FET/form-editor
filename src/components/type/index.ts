import { FieldDefinition } from './field';
import { GridDefinition } from './layout';

export * from './field'
export * from './layout'

export type ControlDefinition = FieldDefinition | GridDefinition;

export class FormDefinition {
  list: Array<ControlDefinition> = []
  config: FormOptions = new FormOptions()
}

export interface GridOptions {
  span: number
  list: FieldDefinition[]
}

export class FormOptions {
  disabled: boolean = false;
}













