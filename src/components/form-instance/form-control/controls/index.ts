import { Component, Prop, Vue } from 'vue-property-decorator'
import InputControl from './fields/input-control/index.vue'
import TextareaControl from './fields/textarea-control/index.vue'
import SelectControl from './fields/select-control/index.vue'
import TextControl from './fields/text-control/index.vue'
import HtmlControl from './fields/html-control/index.vue'
import FileuploadControl from './fields/fileupload-control/index.vue'
import ImguploadControl from './fields/imgupload-control/index.vue'
import TableControl from './fields/table-control/index.vue'

import AuditTextControl from './fields/audit-text-control/index.vue'
import AuditFileControl from './fields/audit-file-control/index.vue'
import AuditDiffControl from './fields/audit-diff-control/index.vue'

import GridControl from './layouts/grid-control/index.vue'
import TabsControl from './layouts/tabs-control/index.vue'
import BlockControl from './layouts/block-control/index.vue'

@Component({
  components: {
    InputControl,
    TextareaControl,
    SelectControl,
    TextControl,
    HtmlControl,
    FileuploadControl,
    ImguploadControl,
    TableControl,
    GridControl,
    TabsControl,
    BlockControl,
    AuditTextControl,
    AuditFileControl,
    AuditDiffControl
  }
})
export default class ControlMixins extends Vue {
}
