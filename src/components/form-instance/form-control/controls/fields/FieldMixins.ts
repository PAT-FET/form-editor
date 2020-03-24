
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
    const name = this.def.name
    if (this.options.required) {
      const rule: any = { required: true, message: `${name}必填填写`, trigger: 'change' }
      if (Array.isArray(this.options.required)) {
        rule.type = 'array'
      }
      ret.push(rule)
    }
    const pattern = (this.options as any).pattern
    if (pattern) {
      ret.push({ pattern, message: `${name}格式不匹配: ${pattern}`, trigger: 'change' })
    }
    this.def.rules = ret.map(v => {
      const item = Object.assign({}, v)
      delete item.trigger
      return item
    })
    return ret
  }

  @Watch('defaultValue') defaultValueChange () {
    if (this.value === undefined) this.value = this.defaultValue
  }

  @Watch('model') modelChange (newVal: string, oldVal: string) {
    this.$set(this.formData, newVal, this.formData[oldVal])
    delete this.formData[oldVal]
  }

  @Watch('formData', { immediate: true }) formDataChange () {
    if (this.formData[this.def.model] === undefined) this.$set(this.formData, this.def.model, this.defaultValue)
  }

  beforeDestroy () {
    delete this.formData[this.def.model]
  }
}
