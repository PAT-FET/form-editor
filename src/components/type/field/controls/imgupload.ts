import { FieldRule } from '../rule'
import { FileData } from '../type'

export interface FieldImguploadDefinition {
  type: 'imgupload';
  key: string;
  name: string;
  model: string;
  options: FieldImguploadOptions;
  rules?: FieldRule;
}

export interface FieldImguploadOptions {
  disabled: boolean;
  action: string;
  limit: number;
  defaultValue: FileData[];
  required?: boolean;
}
