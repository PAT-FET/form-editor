import { Component, Prop, Vue } from 'vue-property-decorator'
import InputControl from './fields/input-control/index.vue'
import TextareaControl from './fields/textarea-control/index.vue'
import SelectControl from './fields/select-control/index.vue'
import FileuploadControl from './fields/fileupload-control/index.vue'
import ImguploadControl from './fields/imgupload-control/index.vue'

import GridControl from './layouts/grid-control/index.vue'

@Component({
  components: {
    InputControl,
    TextareaControl,
    SelectControl,
    FileuploadControl,
    ImguploadControl,
    GridControl
  }
})
export default class ControlMixins extends Vue {
}
