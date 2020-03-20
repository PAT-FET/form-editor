import { FieldDefinition } from './field';
import { GridDefinition } from './layout';

export * from './field'
export * from './layout'

export interface FormDefinition {
  list: Array<FieldDefinition | GridDefinition>;
  config?: FormOptions;
}

export interface GridOptions {
  span: number
  list: FieldDefinition[]
}

export interface FormOptions {
  disabled: boolean;
}













