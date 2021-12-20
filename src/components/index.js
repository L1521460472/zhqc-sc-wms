/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2021-10-06 10:47:59
 * @LastEditors: lijiancong
 * @LastEditTime: 2021-11-13 10:02:00
 */
import Vue from 'vue'
//
// import pageTable from 'zhqc-property-table'
import pageTable from '@/Subassembly/ZhqcTable'
import fullPop from 'zhqc-full-pop-layer'
import fullPopItem from 'zhqc-full-pop-layer-item'
import layoutBody from 'zhqc-property-layout-body'
import layoutBodyAuto from 'zhqc-property-layout-body-auto'
import zhqcDialog from 'zhqc-property-dialog'
// import zhqcForm from 'zhqc-property-dia-form'
import zhqcForm from '@/Subassembly/ZhqcDiaForm'
import zhqcLinkForm from '@/Subassembly/ZhqcLinkForm'
import fullByPop from './../Subassembly/full/index'
// import zhqcTopForm from 'zhqc-property-top-form'
import zhqcTopForm from './../Subassembly/ZhqcTopForm'
import ZhqcTopFormSc from '@/Subassembly/ZhqcTopFormSc'
// import zhqcPage from 'zhqc-property-pagination'
import zhqcPage from './../Subassembly/zhqcPage'
import PageSonTabForm from 'zhqc-property-son-tab-form'
// import vexDiaTable from 'zhqc-property-dia-edit-table'
import vexDiaTable from './../Subassembly/ZhqcEditTable'
import vexDiaTableTow from './../Subassembly/ZhqcEditTableTow'
import VexTableFh from '@/Subassembly/ZhqcVexTableFullHeight'
import douNpmTreetable from '../Subassembly/TreeTable'

// import douNpmTreetable from 'zhqc-property-tree-table'
// import zhqcDialogVxeGrid from 'zhqc-property-vxe-grid'
import zhqcDialogVxeGrid from './../Subassembly/ZhqcVexTable'
import douNpmPracticeSearch from 'zhqc-property-search'
import douNpmPracticeBreadcrumb from 'zhqc-property-breadcrumb'
import { uploadVue, exportVue, exportTemplateVue } from '@/layout/Excel/index.js'
import zhqcImage from '@/layout/image/imgAlart'
import zhqcDraggable from '@/Subassembly/zhqcDraggable'
import titleBox from '@/Subassembly/TitleBox'
import ZhqcTabs from '@/Subassembly/ZhqcTabs'
import ZhqcPdfView from '@/Subassembly/ZhqcPdfView'
import zhqcAreaInput from '@/Subassembly/ZhqcList/zhqcAreaInput'
import ZhqcTransfer from '@/Subassembly/ZhqcTransfer'
import VueUeditorWrap from 'vue-ueditor-wrap'
import ZhqcEditors from '@/Subassembly/ZhqcEditors'

import remoteList from '@/Subassembly/ZhqcList/zhqcRemoteList'
import remoteListOne from '@/Subassembly/ZhqcList/zhqcRemoteListOne'
import remoteListTwo from '@/Subassembly/ZhqcList/zhqcRemoteListTwo'
import remoteListThree from '@/Subassembly/ZhqcList/zhqcRemoteListThree'
import codeRemoteList from '@/Subassembly/ZhqcList/zhqcRemoteCodeNameList'
import ListRemote from '@/Subassembly/ZhqcList/ListRemote'
import ZhqcAgGrid from '@/Subassembly/ZhqcAgGrid'
import ZhqcSwitchTabs from '@/Subassembly/ZhqcSwitchTabs'
// import zhqcAreaInput from '@/Subassembly/ZhqcList/zhqcAreaInput'

// 注意 有些组件使用异步加载会有影响
Vue.component('zhqc-table', pageTable)
Vue.component('layout-body', layoutBody)
Vue.component('layout-body-auto', layoutBodyAuto)
Vue.component('zhqc-dialog', zhqcDialog)
Vue.component('zhqc-form', zhqcForm)
Vue.component('zhqc-link-form', zhqcLinkForm)
Vue.component('zhqc-top-form', zhqcTopForm)
Vue.component('zhqc-page', zhqcPage)
Vue.component('zhqc-son-tab-form', PageSonTabForm)
Vue.component('full-pop', fullPop)
Vue.component('full-pop-item', fullPopItem)
Vue.component('upload-vue', uploadVue)
Vue.component('export-vue', exportVue)
Vue.component('full-by-pop', fullByPop)
Vue.component('export-template-vue', exportTemplateVue)
Vue.component('tree-table', douNpmTreetable)
Vue.component('zhqc-property-search', douNpmPracticeSearch)
Vue.component('breadcrumb', douNpmPracticeBreadcrumb)
Vue.component('vex-dia-table', vexDiaTable)
Vue.component('vex-dia-table-tow', vexDiaTableTow)
Vue.component('vex-table-fh', VexTableFh)
Vue.component('vex-dia-grid', zhqcDialogVxeGrid)
Vue.component('vue-ueditor-wrap', VueUeditorWrap)
Vue.component('zhqc-image', zhqcImage)
Vue.component('remote-list', remoteList)
Vue.component('remote-list-one', remoteListOne)
Vue.component('remote-list-two', remoteListTwo)
Vue.component('remote-list-three', remoteListThree)
Vue.component('list-remote', ListRemote)
Vue.component('code-remote-list', codeRemoteList)
Vue.component('zhqc-top-form-sc', ZhqcTopFormSc)
Vue.component('zhqc-draggable', zhqcDraggable)
Vue.component('title-box', titleBox)
Vue.component('zhqc-tabs', ZhqcTabs)
Vue.component('zhqc-pdf-view', ZhqcPdfView)
Vue.component('zhqc-transfer', ZhqcTransfer)
Vue.component('zhqc-switch-tabs', ZhqcSwitchTabs)
Vue.component('zhqc-area-input', zhqcAreaInput)
Vue.component('zhqc-ag-grid', ZhqcAgGrid)
Vue.component('zhqc-editors', ZhqcEditors)
