import { FieldRule } from '../rule';

export interface FieldInputDefinition {
  type: 'input';
  key: string;
  name: string;
  model: string;
  options: FieldInputOptions;
  rules?: FieldRule;
}

export interface FieldInputOptions {
  disabled: boolean;
  dataType: 'string' | 'email';
  defaultValue?: string;
  required?: boolean;
  pattern?: string;
  placeholder?: string;

}