import { ControlDefinition } from './controls'

export * from './controls'

export class FormDefinition {
  list: Array<ControlDefinition> = []
  config: FormOptions = new FormOptions()
}

export class FormOptions {
  labelWidth: number = 100
  labelPosition: 'top' | 'right' | 'left' = 'right'
  size: 'small' | 'medium' | 'mini' = 'small'
}













