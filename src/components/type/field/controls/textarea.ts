import { FieldRule } from '../rule';

export interface FieldTextareaDefinition {
  type: 'textarea';
  key: string;
  name: string;
  model: string;
  options: FieldTextareaOptions;
  rules?: FieldRule;
}

export interface FieldTextareaOptions {
  disabled: boolean;
  defaultValue?: string;
  required?: boolean;
  pattern?: string;
  placeholder?: string;
}