<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { CreateElement, VNode } from 'vue'
import { ControlDefinition } from '@/components/type'

import ControlMask from './control-mask/index.vue'
import ControlMixins from './controls'

@Component({
  components: {
    ControlMask
  },
  name: 'form-control'
})
export default class FormContorl extends mixins(ControlMixins) {
  @Prop() def!: ControlDefinition

  @Prop(Boolean) design!: boolean

  @Prop() rowFormData!: any

  @Provide() getRowFormData () {
    return this.rowFormData
  }

  render (h: CreateElement) {
    const props = { def: this.def }
    const control = h(this.def.type + 'Control', { props })
    const mask = h('control-mask', { props }, [control])
    return this.design ? mask : control
  }
}
</script>
