import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import AttrField from '../atrr-field/index.vue'
import { ControlDefinition } from '@/components/type'

@Component({
  components: { AttrField }
})
export default class ControlMixins extends Vue {
  @Inject() getActiveControl!: () => ControlDefinition

  get activeControl (): ControlDefinition {
    return this.getActiveControl()
  }
}
