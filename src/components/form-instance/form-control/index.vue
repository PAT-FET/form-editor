<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'
import { ControlDefinition } from '@/components/type'

import ControlMask from './control-mask/index.vue'

import InputControl from './controls/input-control/index.vue'
import TextareaControl from './controls/textarea-control/index.vue'
import SelectControl from './controls/select-control/index.vue'
import FileuploadControl from './controls/fileupload-control/index.vue'
import ImguploadControl from './controls/imgupload-control/index.vue'

@Component({
  components: {
    ControlMask,
    InputControl,
    TextareaControl,
    SelectControl,
    FileuploadControl,
    ImguploadControl
  }
})
export default class FormContorl extends Vue {
  @Prop() def!: ControlDefinition

  @Prop(Boolean) design!: boolean

  render (h: CreateElement) {
    const props = { def: this.def }
    const control = h(this.def.type + 'Control', { props })
    const mask = h('control-mask', { props }, [control])
    return this.design ? mask : control
  }
}
</script>
