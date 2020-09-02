import {
  FieldInputDefinition,
  FieldTextareaDefinition,
  FieldSelectDefinition,
  FieldTextDefinition,
  FieldHtmlDefinition,
  FieldFileuploadDefinition,
  FieldImguploadDefinition,
  FieldTableDefinition,
  GridDefinition,
  TabsDefinition,
  BlockDefinition,
  FieldAuditTextDefinition,
  FieldAuditFileDefinition
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
  new FieldImguploadDefinition(),
  new FieldTableDefinition()
]

export const layoutControls = [
  new GridDefinition(),
  new TabsDefinition(),
  new BlockDefinition()
]

export const auditControls = [
  new FieldAuditTextDefinition(),
  new FieldAuditFileDefinition()
]
