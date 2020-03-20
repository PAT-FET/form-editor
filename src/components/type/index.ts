import { FieldDefinition } from './field';
import { GridDefinition } from './layout';

export * from './field'
export * from './layout'

export type ControlDefinition = FieldDefinition | GridDefinition;

export interface FormDefinition {
  list: Array<ControlDefinition>;
  config: FormOptions;
}

export interface GridOptions {
  span: number
  list: FieldDefinition[]
}

export interface FormOptions {
  disabled: boolean;
}













