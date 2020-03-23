
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator'
import { FieldDefinition, FieldOptions } from '@/components/type'

@Component
export default class InputControl<D extends FieldDefinition, O extends FieldOptions > extends Vue {
  @Prop() def!: D

  @Inject() getFormData!: () => Record<string, any>

  get formData () {
    return this.getFormData()
  }

  get options (): O {
    return this.def.options as O
  }

  get defaultValue () {
    return this.options.defaultValue
  }

  get model () {
    return this.def.model
  }

  get value () {
    return this.formData[this.def.model]
  }

  set value (val) {
    this.formData[this.def.model] = val
  }

  get rules () {
    const ret: any[] = []
    if (this.options.required) {
      ret.push({ required: true, message: '单行文本必须填写', trigger: 'change' })
    }
    const pattern = (this.options as any).pattern
    if (pattern) {
      ret.push({ pattern, message: `不合法表达式, 格式${pattern}`, trigger: 'change' })
    }
    return ret
  }

  @Watch('defaultValue') defaultValueChange () {
    this.value = this.defaultValue
  }

  @Watch('model') modelChange (newVal: string, oldVal: string) {
    this.$set(this.formData, newVal, this.formData[oldVal])
    delete this.formData[oldVal]
  }

  created () {
    if (this.formData[this.def.model] === undefined) this.$set(this.formData, this.def.model, this.defaultValue)
  }

  beforeDestroy () {
    delete this.formData[this.def.model]
  }
}
