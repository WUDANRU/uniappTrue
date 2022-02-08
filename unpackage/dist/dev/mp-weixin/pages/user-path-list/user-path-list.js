(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/user-path-list/user-path-list"],{

/***/ 103:
/*!**************************************************************************************************************!*\
  !*** C:/Users/17812/Documents/HBuilderProjects/a/main.js?{"page":"pages%2Fuser-path-list%2Fuser-path-list"} ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _userPathList = _interopRequireDefault(__webpack_require__(/*! ./pages/user-path-list/user-path-list.vue */ 104));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_userPathList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 104:
/*!*******************************************************************************************!*\
  !*** C:/Users/17812/Documents/HBuilderProjects/a/pages/user-path-list/user-path-list.vue ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user_path_list_vue_vue_type_template_id_77ba3046___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-path-list.vue?vue&type=template&id=77ba3046& */ 105);
/* harmony import */ var _user_path_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-path-list.vue?vue&type=script&lang=js& */ 107);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _user_path_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _user_path_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 13);

var renderjs




/* normalize component */

var component = Object(_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _user_path_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _user_path_list_vue_vue_type_template_id_77ba3046___WEBPACK_IMPORTED_MODULE_0__["render"],
  _user_path_list_vue_vue_type_template_id_77ba3046___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _user_path_list_vue_vue_type_template_id_77ba3046___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/user-path-list/user-path-list.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 105:
/*!**************************************************************************************************************************!*\
  !*** C:/Users/17812/Documents/HBuilderProjects/a/pages/user-path-list/user-path-list.vue?vue&type=template&id=77ba3046& ***!
  \**************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_path_list_vue_vue_type_template_id_77ba3046___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./user-path-list.vue?vue&type=template&id=77ba3046& */ 106);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_path_list_vue_vue_type_template_id_77ba3046___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_path_list_vue_vue_type_template_id_77ba3046___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_path_list_vue_vue_type_template_id_77ba3046___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_path_list_vue_vue_type_template_id_77ba3046___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 106:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/17812/Documents/HBuilderProjects/a/pages/user-path-list/user-path-list.vue?vue&type=template&id=77ba3046& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 107:
/*!********************************************************************************************************************!*\
  !*** C:/Users/17812/Documents/HBuilderProjects/a/pages/user-path-list/user-path-list.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_path_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./user-path-list.vue?vue&type=script&lang=js& */ 108);
/* harmony import */ var _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_path_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_path_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_path_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_path_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_path_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 108:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/17812/Documents/HBuilderProjects/a/pages/user-path-list/user-path-list.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;














































var _vuex = __webpack_require__(/*! vuex */ 15);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var uniListItem = function uniListItem() {__webpack_require__.e(/*! require.ensure | components/uni-ui/uni-common/uni-list-item/uni-list-item */ "components/uni-ui/uni-common/uni-list-item/uni-list-item").then((function () {return resolve(__webpack_require__(/*! @/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue */ 268));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniSwipeAction = function uniSwipeAction() {Promise.all(/*! require.ensure | components/uni-ui/uni-swipe-action-item/uni-swipe-action-item */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-ui/uni-swipe-action-item/uni-swipe-action-item")]).then((function () {return resolve(__webpack_require__(/*! @/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue */ 380));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var noThing = function noThing() {__webpack_require__.e(/*! require.ensure | components/no-thing */ "components/no-thing").then((function () {return resolve(__webpack_require__(/*! @/components/no-thing.vue */ 333));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =




{
  components: {
    uniListItem: uniListItem,
    uniSwipeAction: uniSwipeAction,
    noThing: noThing },

  data: function data() {
    return {
      // 上拉加载更多 加载中 没有更多了
      loadtext: "上拉加载更多",
      page: 1,
      isChoose: false, //true表示从confirm页面进来的
      rightOptions: [{
        text: '修改',
        style: {
          backgroundColor: '#007aff' } },

      {
        text: '删除',
        style: {
          backgroundColor: '#dd524d' } }] };



  },
  // 监听导航栏按钮点击
  onNavigationBarButtonTap: function onNavigationBarButtonTap(e) {//创建地址(+号在pages.json写的)
    console.log(e);
    if (e.index === 0) {
      uni.navigateTo({
        url: '/pages/user-path-edit/user-path-edit' });

    }
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)({
    list: function list(state) {return state.path.list;} })),


  onLoad: function onLoad(e) {var _this = this;
    //console.log(e) //confirm页传来的{type: 'choose'}
    if (e.type === 'choose') {
      this.isChoose = true;
      console.log(this.list, 'this.list[0]');
    }

    this.getData();

    // 注册一个监听事件
    uni.$on('updateUserPathList', function () {
      _this.page = 1;
      _this.getData();
    });

  },
  onUnload: function onUnload() {
    uni.$off('updateUserPathList');
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.page = 1;
    this.getData(function () {
      uni.stopPullDownRefresh();
    });
  },
  onReachBottom: function onReachBottom() {
    // 是否已经处于加载状态
    if (this.loadtext !== '上拉加载更多') return;
    // 改变加载状态
    this.loadtext = '加载中...';
    this.page++;
    //请求数据
    // this.getData() //共走了1次，没有走callback，走了this.getData()1次

    this.getData(function () {//共走了2次，走callback1次，和this.getData()1次
      uni.showToast({
        title: '加载成功', //这个会替换掉刷新成功
        icon: 'none' });

    });
  },
  methods: _objectSpread(_objectSpread({},
  (0, _vuex.mapMutations)(['delPath', 'updatePathList'])), {}, {
    // 初始化
    getData: function getData() {var _this2 = this;var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.$H.get('/useraddresses/' + this.page, {}, {
        token: true }).
      then(function (res) {
        var refresh = _this2.page === 1;
        _this2.updatePathList({
          refresh: refresh, //分页为1表示下拉刷新，分页为2或2以上表示上拉加载
          list: res });

        _this2.loadtext = res.length < 10 ? '没有更多了' : '上拉加载更多';
        // 下拉刷新
        if (typeof callback === 'function') {
          uni.showToast({
            title: '刷新成功',
            icon: 'none' });

          callback();
          console.log('里');
        }
        console.log('外');
        // 404服务端失败走catch
      }).catch(function (err) {//catch加或不加都可以，search-list.vue也可以同样写catch
        if (typeof callback === 'function') {
          callback();
        }
        if (_this2.page > 1) {//=1表示下拉刷新，>1表示只存在于上拉加载
          // 页码回归上一页   //this.page++ 加1如果刷新失败,页码回归上一页
          _this2.page--;
          _this2.loadtext = '上拉加载更多';
        }
      });
    },
    // 选择收货地址
    choose: function choose(item) {
      if (this.isChoose) {//从confirm页面进来的才触发choose方法
        //通知订单提交页修改收货地址
        uni.$emit('choosePath', item); //吧item传给confirm页
        // 关闭当前页面(返回上一页)
        uni.navigateBack({
          delta: 1 });


      }
    },
    bindClick: function bindClick(e, index) {var _this3 = this;
      // console.log(e, index) //e.index有0，1，其中0代表修改，1代表删除   //e.content.text
      switch (e.index) {
        case 0: //修改
          var obj = {
            dex: index,
            item: this.list[index] };

          console.log(obj.item, 'obj');
          // 加上是否默认  default必须是1，0
          obj.item.default = index === 0 && obj.item.last_used_time !== null ? 1 : 0;
          console.log(obj.item.default, 'default');
          console.log(obj.item, 'default');
          setTimeout(function () {//如果点击修改反应比较慢然后点击后要跳转，这个问题可以延迟解决
            uni.navigateTo({
              url: '../user-path-edit/user-path-edit?data=' + JSON.stringify(obj) });

          }, 50);
          break;

        case 1: //删除
          uni.showModal({
            content: '要删除该收货地址吗？',
            success: function success(res) {
              if (res.confirm) {

                // 删除需要id，通过索引拿到id
                _this3.$H.del('/useraddresses/' + _this3.list[index].id, {}, {
                  token: true }).
                then(function (res) {
                  _this3.delPath(index); //直接写this要用箭头函数
                  uni.showToast({
                    title: '删除成功' });

                });
              }
            } });

          break;}

    } }) };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

},[[103,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user-path-list/user-path-list.js.map