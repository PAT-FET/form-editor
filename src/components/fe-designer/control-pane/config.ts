import {
  FieldInputDefinition,
  FieldTextareaDefinition,
  FieldSelectDefinition,
  FieldTextDefinition,
  FieldHtmlDefinition,
  FieldCustomerDefinition,
  FieldFileuploadDefinition,
  FieldImguploadDefinition,
  FieldTableDefinition,
  GridDefinition,
  TabsDefinition,
  BlockDefinition,
  FieldAuditTextDefinition,
  FieldAuditFileDefinition,
  FieldAuditDiffDefinition,
  FieldAuditListDefinition,
  FieldLatticeDefinition
} from '@/components/type'

export const layoutControls = [
  new FieldAuditListDefinition(),
  new FieldLatticeDefinition()
]

export const dataControls = [
  new FieldAuditDiffDefinition(),
  new FieldTableDefinition()
]

export const basicControls = [
  new FieldAuditTextDefinition(),
  new FieldAuditFileDefinition(),
  new FieldFileuploadDefinition(),
  new FieldImguploadDefinition()
]

export const otherControls = [
  new GridDefinition(),
  new TabsDefinition(),
  new BlockDefinition(),
  new FieldInputDefinition(),
  new FieldTextareaDefinition(),
  new FieldSelectDefinition(),
  new FieldTextDefinition(),
  new FieldHtmlDefinition()
]

export const infoControls = [
  new FieldCustomerDefinition()
]
