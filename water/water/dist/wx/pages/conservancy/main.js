require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([2],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(10);





var app = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
  store: __WEBPACK_IMPORTED_MODULE_3__store__["a" /* default */]
}, __WEBPACK_IMPORTED_MODULE_2__index__["a" /* default */]));
app.$mount();

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_1230fa72_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(106);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(104)
}
var normalizeComponent = __webpack_require__(17)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1230fa72"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_1230fa72_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\conservancy\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1230fa72", Component.options)
  } else {
    hotAPI.reload("data-v-1230fa72", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 104:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      lat: '', //纬度
      lng: '', //经度
      id: ''
    };
  },

  computed: {
    getList: function getList() {
      return this.$store.state.home.details;
    }
  },
  methods: {
    goJump: function goJump() {
      wx.navigateTo({
        url: "/pages/conservancy/switchcity/main"
      });
    },
    laodAdd: function laodAdd() {
      var _this = this;
      wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function success(res) {
          _this.lat = res.latitude;
          _this.lng = res.longitude;

          var latArr = { lat: res.latitude, lng: res.longitude };
          wx.setStorageSync('latArr', latArr);
        }
      });
    }
  },
  created: function created() {
    this.laodAdd();
  },
  onLoad: function onLoad() {
    this.latArr = wx.getStorageSync('latArr');
    this.id = this.$root.$mp.query.id ? this.$root.$mp.query.id : '';

    var parame = {
      lat: this.latArr.lat,
      lng: this.latArr.lng
    };
    if (this.id) {
      parame.id = this.id;
    }
    this.$store.dispatch('home/getDetails', parame);
  }
});

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "hardness"
  }, [_c('div', {
    staticClass: "city",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.goJump
    }
  }, [_c('div', [_vm._v(_vm._s(_vm.getList.province) + _vm._s(_vm.getList.city) + _vm._s(_vm.getList.district))]), _vm._v(" "), _c('img', {
    attrs: {
      "src": "../../../static/images/icon-Path.png",
      "alt": ""
    }
  })]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('div', {
    staticClass: "bor"
  }), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_vm._v(_vm._s(_vm.getList.waterHardnessValue))]), _vm._v(" "), _c('div', {
    staticClass: "hardness_btn"
  }, [_c('div', {
    staticClass: "hardness_msg"
  }, [_c('div', {
    staticClass: "Set_up"
  }, [_c('h3', [_vm._v("洗碗机设置")])], 1), _vm._v(" "), _c('div', {
    staticClass: "set_msg"
  }, [_c('div', {
    staticClass: "set_left"
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/icon1.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('h4', [_vm._v("请设置为")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.getList.avalue))]), _vm._v(" "), _c('div', {
    staticClass: "btn"
  }, [_vm._v("查看操作方式")])], 1), _vm._v(" "), _c('div', {
    staticClass: "set_left"
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/icon1.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('h4', [_vm._v("请设置为")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.getList.bvalue))]), _vm._v(" "), _c('div', {
    staticClass: "btn"
  }, [_vm._v("查看操作方式")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "Explain"
  }, [_vm._v("目前仅提供西门子操作方式视频，博世设备请查看相关说明书")])])])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "Location"
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/icon-Shape.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('span', [_vm._v("重新定位")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "Water"
  }, [_c('span', [_vm._v("水硬度值")]), _vm._v(" "), _c('img', {
    attrs: {
      "src": "../../../static/images/icon3.png",
      "alt": ""
    }
  })])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1230fa72", esExports)
  }
}

/***/ })

},[102]);
//# sourceMappingURL=main.js.map