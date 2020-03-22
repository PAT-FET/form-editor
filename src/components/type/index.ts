import { ControlDefinition } from './controls'

export * from './controls'

export class FormDefinition {
  list: Array<ControlDefinition> = []
  config: FormOptions = new FormOptions()
}

export class FormOptions {
  disabled: boolean = false;
}













