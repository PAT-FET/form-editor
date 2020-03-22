import { FieldInputOptions, FieldInputDefinition } from './input'
import { FieldTextareaOptions, FieldTextareaDefinition } from './textarea'
import { FieldSelectOptions, FieldSelectDefinition } from './select'
import { FieldFileuploadOptions, FieldFileuploadDefinition } from './fileupload'
import { FieldImguploadOptions, FieldImguploadDefinition } from './imgupload'

export {
  FieldInputOptions, FieldInputDefinition,
  FieldTextareaOptions, FieldTextareaDefinition,
  FieldSelectOptions, FieldSelectDefinition,
  FieldFileuploadOptions, FieldFileuploadDefinition,
  FieldImguploadOptions, FieldImguploadDefinition
}

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
