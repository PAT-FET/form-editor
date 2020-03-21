import {
  FieldInputDefinition,
  FieldTextareaDefinition,
  FieldSelectDefinition,
  FieldFileuploadDefinition,
  FieldImguploadDefinition,
  GridDefinition
} from '@/components/type'

const controls = [
  new FieldInputDefinition(),
  new FieldTextareaDefinition(),
  new FieldSelectDefinition(),
  new FieldFileuploadDefinition(),
  new FieldImguploadDefinition(),
  new GridDefinition()
]

export function getControls () {
  return controls
}
