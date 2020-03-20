import { FieldDefinition } from '../../field';

export interface GridDefinition {
  type: 'grid';
  columns: {};
}

export interface GridOptions {
  span: number
  list: FieldDefinition[]
}