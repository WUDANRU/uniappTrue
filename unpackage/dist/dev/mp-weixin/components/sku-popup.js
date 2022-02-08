(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/sku-popup"],{

/***/ 299:
/*!****************************************************************************!*\
  !*** C:/Users/17812/Documents/HBuilderProjects/a/components/sku-popup.vue ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sku_popup_vue_vue_type_template_id_ce35015e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sku-popup.vue?vue&type=template&id=ce35015e& */ 300);
/* harmony import */ var _sku_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sku-popup.vue?vue&type=script&lang=js& */ 302);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _sku_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _sku_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 13);

var renderjs




/* normalize component */

var component = Object(_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _sku_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _sku_popup_vue_vue_type_template_id_ce35015e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _sku_popup_vue_vue_type_template_id_ce35015e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _sku_popup_vue_vue_type_template_id_ce35015e___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/sku-popup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 300:
/*!***********************************************************************************************************!*\
  !*** C:/Users/17812/Documents/HBuilderProjects/a/components/sku-popup.vue?vue&type=template&id=ce35015e& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_sku_popup_vue_vue_type_template_id_ce35015e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./sku-popup.vue?vue&type=template&id=ce35015e& */ 301);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_sku_popup_vue_vue_type_template_id_ce35015e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_sku_popup_vue_vue_type_template_id_ce35015e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_sku_popup_vue_vue_type_template_id_ce35015e___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_sku_popup_vue_vue_type_template_id_ce35015e___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 301:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/17812/Documents/HBuilderProjects/a/components/sku-popup.vue?vue&type=template&id=ce35015e& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = Array.isArray(_vm.popupData)

  if (!_vm._isMounted) {
    _vm.e0 = function($event) {
      _vm.popupData.item.num = $event
    }
  }

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 302:
/*!*****************************************************************************************************!*\
  !*** C:/Users/17812/Documents/HBuilderProjects/a/components/sku-popup.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_sku_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../QMDownload/SoftMgr/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./sku-popup.vue?vue&type=script&lang=js& */ 303);
/* harmony import */ var _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_sku_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_sku_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_sku_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_sku_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_sku_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 303:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/17812/Documents/HBuilderProjects/a/components/sku-popup.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;






























































var _vuex = __webpack_require__(/*! vuex */ 15);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var commonPopup = function commonPopup() {__webpack_require__.e(/*! require.ensure | components/common-popup */ "components/common-popup").then((function () {return resolve(__webpack_require__(/*! @/components/common-popup.vue */ 373));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var zcmRadioGroup = function zcmRadioGroup() {__webpack_require__.e(/*! require.ensure | components/common/radio-group */ "components/common/radio-group").then((function () {return resolve(__webpack_require__(/*! @/components/common/radio-group.vue */ 321));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniNumberBox = function uniNumberBox() {__webpack_require__.e(/*! require.ensure | components/uni-ui/uni-number-box/uni-number-box */ "components/uni-ui/uni-number-box/uni-number-box").then((function () {return resolve(__webpack_require__(/*! @/components/uni-ui/uni-number-box/uni-number-box.vue */ 287));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var card = function card() {Promise.all(/*! require.ensure | components/common/card */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/common/card")]).then((function () {return resolve(__webpack_require__(/*! @/components/common/card.vue */ 316));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var price = function price() {__webpack_require__.e(/*! require.ensure | components/price */ "components/price").then((function () {return resolve(__webpack_require__(/*! @/components/price.vue */ 282));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =






{
  components: {
    commonPopup: commonPopup,
    uniNumberBox: uniNumberBox,
    zcmRadioGroup: zcmRadioGroup,
    card: card,
    price: price },

  computed: _objectSpread(_objectSpread(_objectSpread({},
  (0, _vuex.mapState)({
    popupShow: function popupShow(state) {return state.cart.popupShow;},
    popupData: function popupData(state) {return state.cart.popupData;} })),

  (0, _vuex.mapGetters)([
    // 'popupData'
  ])), {}, {
    // 用户选中的sku
    checkedSkus: function checkedSkus() {
      if (!this.pupupData && !Array.isArray(this.pupupData)) {
        return '';
      }
      // if(!this.pupupData.selects && !Array.isArray(this.pupupData.selects)){ //这样还会报selects是undefined
      // 	return ''
      // }
      // 拿到选中skus组成字符串,默认选中的是第一个
      var checkedSkus = this.popupData.selects.map(function (v) {
        // console.log(v.list) //两个数组[ [{},{}] , [{},{}] ]
        return v.list[v.selected].name; // ['黄色', '标配']
      });
      // console.log(checkedSkus,'checkedSkuscheckedSkus')
      return checkedSkus.join(',');
      // 拿到skusText
      // this.selects[0]
    },
    // 选中skus的索引
    checkedSkusIndex: function checkedSkusIndex() {var _this = this;
      if (!this.popupData.goods_skus && !Array.isArray(this.popupData.goods_skus)) {
        return -1;
      }
      // 数组可以通过查找下标来拿
      var index = this.popupData.goods_skus.findIndex(function (item) {
        return item.skusText === _this.checkedSkus; //goodsSkus的四种可能比对goodsSkusCard(this.selects)规格属性
      });
      return index;
    },
    // 显示价格
    showPrice: function showPrice() {//没有选中属性价格就显示sku最小的价格，选中属性价格就跟着改变
      // console.log(this.checkedSkusIndex) //0
      if (this.checkedSkusIndex < 0) {// if (!this.checkedSkus) {
        // return this.popupData.item.pprice || 0.00 //吧页面所有的信息都放在this.detail
        return this.popupData.item ? this.popupData.item.pprice : 0.00;
      }
      return this.popupData.goods_skus[this.checkedSkusIndex].pprice;
      // console.log(this.checkedSkusIndex, 'index')
    } }),

  methods: _objectSpread({},
  (0, _vuex.mapActions)([//点击事件
  'doHidePopup'])) };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/sku-popup.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/sku-popup-create-component',
    {
        'components/sku-popup-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(299))
        })
    },
    [['components/sku-popup-create-component']]
]);
