import { FieldRule } from '../rule';
import { FileData } from '../type';

export interface FieldFileuploadDefinition {
  type: 'fileupload';
  key: string;
  name: string;
  model: string;
  options: FieldFileuploadOptions;
  rules?: FieldRule;
}

export interface FieldFileuploadOptions {
  disabled: boolean;
  action: string;
  limit: number;
  tip: string;
  defaultValue: FileData[];
  required?: boolean;
}