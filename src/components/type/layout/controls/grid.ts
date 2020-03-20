import { FieldDefinition } from '../../field'

export interface GridDefinition {
  type: 'grid';
  key: string;
  columns: {};
}

export interface GridOptions {
  span: number;
  list: FieldDefinition[];
}
