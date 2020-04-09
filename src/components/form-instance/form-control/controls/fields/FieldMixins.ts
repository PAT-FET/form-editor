
import { Component, Prop, Vue, Watch, Inject, InjectReactive } from 'vue-property-decorator'
import { FieldDefinition, FieldOptions } from '@/components/type'

@Component
export default class InputControl<D extends FieldDefinition, O extends FieldOptions > extends Vue {
  @Prop() def!: D

  @Inject() getFormData!: () => Record<string, any>

  @Inject() getRowFormData!: () => any

  @Inject() getEdit!: () => boolean

  @Inject() getDesign!: () => boolean

  @Inject('getTable') injectGetTable!: () => any

  get table () {
    return this.injectGetTable()
  }

  get edit () {
    return this.getEdit()
  }

  get design () {
    return this.getDesign()
  }

  get formData () {
    return this.rowFormData || this.getFormData()
  }

  get rowFormData () {
    return this.getRowFormData()
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
    this.$set(this.formData, this.def.model, val)
  }

  get disabled () {
    if (!this.edit) return true
    if (this.table) {
      return this.table.disabled
    }
    return this.options.disabled
  }

  get label () {
    return this.table ? '' : (this.def.name + ' : ')
  }

  get labelWidth () {
    return this.table ? '0px' : undefined
  }

  get rules () {
    const ret: any[] = []
    const name = this.def.name
    if (this.options.required) {
      const rule: any = { required: true, message: `${name}必填填写`, trigger: 'change' }
      if (Array.isArray(this.options.defaultValue)) {
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

  @Watch('defaultValue', { deep: true }) defaultValueChange () {
    if (!this.design) return
    this.value = this.defaultValue
    if ((this as any).refresh) {
      (this as any).refresh()
    }
  }

  @Watch('model') modelChange (newVal: string, oldVal: string) {
    this.$set(this.formData, newVal, this.formData[oldVal])
    delete this.formData[oldVal]
  }

  @Watch('formData', { immediate: true }) formDataChange () {
    if (this.formData[this.def.model] === undefined) this.value = this.defaultValue
  }

  beforeDestroy () {
    delete this.formData[this.def.model]
  }

  created () {
    if (this.formData[this.def.model] === undefined) this.value = this.defaultValue
  }
}
