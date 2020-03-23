import { Component, Prop, Vue, InjectReactive } from 'vue-property-decorator'
import AttrField from '../atrr-field/index.vue'
import { ControlDefinition } from '@/components/type'

@Component({
  components: { AttrField }
})
export default class ControlMixins extends Vue {
  @InjectReactive() activeControl!: ControlDefinition
}
