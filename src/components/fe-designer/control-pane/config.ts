import {
  FieldInputDefinition,
  FieldTextareaDefinition,
  FieldSelectDefinition,
  FieldTextDefinition,
  FieldFileuploadDefinition,
  FieldImguploadDefinition,
  GridDefinition
} from '@/components/type'

const controls = [
  new FieldInputDefinition(),
  new FieldTextareaDefinition(),
  new FieldSelectDefinition(),
  new FieldTextDefinition(),
  new FieldFileuploadDefinition(),
  new FieldImguploadDefinition(),
  new GridDefinition()
]

export function getControls () {
  return controls
}
