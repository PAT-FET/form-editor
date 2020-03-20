import { FieldRule } from '../rule';

export interface FieldSelectDefinition {
  type: 'select';
  key: string;
  name: string;
  model: string;
  options: FieldSelectOptions;
  rules?: FieldRule;
}

export interface FieldSelectOptions {
  disabled: boolean;
  multiple: boolean;
  clearable: boolean;
  options: Array<Record<string, string>>;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}