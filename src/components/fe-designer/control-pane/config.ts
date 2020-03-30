import {
  FieldInputDefinition,
  FieldTextareaDefinition,
  FieldSelectDefinition,
  FieldTextDefinition,
  FieldFileuploadDefinition,
  FieldImguploadDefinition,
  GridDefinition
} from '@/components/type'

export const basicControls = [
  new FieldInputDefinition(),
  new FieldTextareaDefinition(),
  new FieldSelectDefinition(),
  new FieldTextDefinition()
]

export const advancedControls = [
  new FieldFileuploadDefinition(),
  new FieldImguploadDefinition()
]

export const layoutControls = [
  new GridDefinition()
]
