export interface FieldTypeRule {
  type: string;
  message: string;
}

export interface FieldRequiredRule {
  required: boolean;
  message: string;
}

export interface FieldPatterndRule {
  pattern: string;
  message: string;
}

export type FieldRule = FieldTypeRule | FieldRequiredRule | FieldPatterndRule