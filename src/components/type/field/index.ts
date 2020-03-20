import { FieldInputOptions, FieldInputDefinition,  } from './controls/input';
import { FieldTextareaOptions, FieldTextareaDefinition } from './controls/textarea';
import { FieldSelectOptions, FieldSelectDefinition } from './controls/select';
import { FieldFileuploadOptions, FieldFileuploadDefinition } from './controls/fileupload';
import { FieldImguploadOptions, FieldImguploadDefinition } from './controls/imgupload';

export {
  FieldInputOptions, FieldInputDefinition,
  FieldTextareaOptions, FieldTextareaDefinition,
  FieldSelectOptions, FieldSelectDefinition,
  FieldFileuploadOptions, FieldFileuploadDefinition,
  FieldImguploadOptions, FieldImguploadDefinition
}

export * from './type';
export * from './rule';

export type FieldOptions = 
FieldInputOptions | 
FieldTextareaOptions | 
FieldSelectOptions | 
FieldFileuploadOptions | 
FieldImguploadOptions;

export type FieldDefinition = 
FieldInputDefinition | 
FieldTextareaDefinition | 
FieldSelectDefinition | 
FieldFileuploadDefinition | 
FieldImguploadDefinition;
