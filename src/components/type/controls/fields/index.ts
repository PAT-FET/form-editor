import { FieldInputOptions, FieldInputDefinition } from './input'
import { FieldTextareaOptions, FieldTextareaDefinition } from './textarea'
import { FieldSelectOptions, FieldSelectDefinition } from './select'
import { FieldTextOptions, FieldTextDefinition } from './text'
import { FieldHtmlOptions, FieldHtmlDefinition } from './html'

import { FieldFileuploadOptions, FieldFileuploadDefinition } from './fileupload'
import { FieldImguploadOptions, FieldImguploadDefinition } from './imgupload'
import { FieldTableOptions, FieldTableDefinition, TableColumn } from './table'

import { FieldAuditTextOptions, FieldAuditTextDefinition } from './audit-text'
import { FieldAuditFileOptions, FieldAuditFileDefinition } from './audit-file'
import { FieldAuditDiffOptions, FieldAuditDiffDefinition } from './audit-diff'
import { FieldAuditListOptions, FieldAuditListDefinition } from './audit-list'

import { FieldLatticeOptions, FieldLatticeDefinition, FieldLatticeColumn } from './lattice'

export {
  FieldInputOptions, FieldInputDefinition,
  FieldTextareaOptions, FieldTextareaDefinition,
  FieldSelectOptions, FieldSelectDefinition,
  FieldTextOptions, FieldTextDefinition,
  FieldHtmlOptions, FieldHtmlDefinition,

  FieldFileuploadOptions, FieldFileuploadDefinition,
  FieldImguploadOptions, FieldImguploadDefinition,
  FieldTableOptions, FieldTableDefinition, TableColumn,

  FieldAuditTextOptions, FieldAuditTextDefinition,
  FieldAuditFileOptions, FieldAuditFileDefinition,
  FieldAuditDiffOptions, FieldAuditDiffDefinition,
  FieldAuditListOptions, FieldAuditListDefinition,
  
  FieldLatticeOptions, FieldLatticeDefinition
}

export type FieldOptions =
FieldInputOptions |
FieldTextareaOptions |
FieldSelectOptions |
FieldTextOptions |
FieldHtmlOptions |
FieldFileuploadOptions |
FieldImguploadOptions |
FieldTableOptions |
FieldAuditTextOptions |
FieldAuditFileOptions |
FieldAuditDiffOptions |
FieldAuditListOptions |
FieldLatticeOptions;

export type FieldDefinition =
FieldInputDefinition |
FieldTextareaDefinition |
FieldSelectDefinition |
FieldTextDefinition |
FieldHtmlDefinition |
FieldFileuploadDefinition |
FieldImguploadDefinition |
FieldTableDefinition |
FieldAuditTextDefinition | 
FieldAuditFileDefinition |
FieldAuditDiffDefinition |
FieldAuditListDefinition | 
FieldLatticeDefinition;


export { FieldLatticeColumn }