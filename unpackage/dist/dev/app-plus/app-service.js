if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$1 = {
    mounted() {
      window.addEventListener("orientationchange", this.handleOrientationChange);
      this.handleOrientationChange();
    },
    beforeDestroy() {
      window.removeEventListener("orientationchange", this.handleOrientationChange);
    },
    methods: {
      // 根据屏幕方向切换布局
      handleOrientationChange() {
        if (window.orientation === 90 || window.orientation === -90) {
          this.$refs.container.style.flexDirection = "row";
          this.$refs.container.style.height = "100%";
          this.$refs.container.style.width = "100%";
          this.$refs.container.style.marginTop = "0";
          this.$refs.container.style.marginBottom = "0";
          this.$refs.container.style.marginLeft = "0";
          this.$refs.container.style.marginRight = "0";
          this.$refs.container.style.display = "flex";
          this.$refs.container.style.alignItems = "stretch";
          this.$refs.container.style.justifyContent = "center";
          this.$refs.container.style.overflow = "hidden";
          this.$refs.container.children[0].style.height = "100%";
          this.$refs.container.children[0].style.width = "66.66%";
          this.$refs.container.children[1].style.height = "100%";
          this.$refs.container.children[1].style.width = "33.33%";
        } else {
          this.$refs.container.style.flexDirection = "column";
          this.$refs.container.style.height = "100%";
          this.$refs.container.style.width = "100%";
          this.$refs.container.style.marginTop = "0";
          this.$refs.container.style.marginBottom = "0";
          this.$refs.container.style.marginLeft = "0";
          this.$refs.container.style.marginRight = "0";
          this.$refs.container.style.display = "flex";
          this.$refs.container.style.alignItems = "stretch";
          this.$refs.container.style.justifyContent = "center";
          this.$refs.container.style.overflow = "hidden";
          this.$refs.container.children[0].style.height = "33.33%";
          this.$refs.container.children[0].style.width = "100%";
          this.$refs.container.children[1].style.height = "33.33%";
          this.$refs.container.children[1].style.width = "100%";
          this.$refs.container.children[2].style.height = "33.33%";
          this.$refs.container.children[2].style.width = "100%";
          this.$refs.container.children[3].style.height = "33.33%";
          this.$refs.container.children[3].style.width = "100%";
        }
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "container",
        ref: "container"
      },
      [
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("view", { class: "col col1" }),
          vue.createElementVNode("view", { class: "col col2" }),
          vue.createElementVNode("view", { class: "col col3" })
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("view", { class: "col col4" })
        ])
      ],
      512
      /* NEED_PATCH */
    );
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/AppProjects/UITester/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/AppProjects/UITester/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
