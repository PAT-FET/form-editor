import {
  FieldInputDefinition,
  FieldTextareaDefinition,
  FieldSelectDefinition,
  FieldTextDefinition,
  FieldHtmlDefinition,
  FieldFileuploadDefinition,
  FieldImguploadDefinition,
  GridDefinition,
  TabsDefinition
} from '@/components/type'

export const basicControls = [
  new FieldInputDefinition(),
  new FieldTextareaDefinition(),
  new FieldSelectDefinition(),
  new FieldTextDefinition(),
  new FieldHtmlDefinition()
]

export const advancedControls = [
  new FieldFileuploadDefinition(),
  new FieldImguploadDefinition()
]

export const layoutControls = [
  new GridDefinition(),
  new TabsDefinition()
]
