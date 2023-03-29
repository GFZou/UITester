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
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const block0 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("echarts");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["echarts"] = "24673c14";
  };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$2 = {
    name: "Echarts",
    props: {
      option: {
        type: Object,
        required: true
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", {
        class: "echarts",
        prop: vue.wp($props.option),
        "change:prop": _ctx.echarts.update
      }, null, 8, ["prop", "change:prop"])
    ]);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$2);
  const echarts = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-1de9429e"], ["__file", "E:/AppProjects/UITester/components/echarts.vue"]]);
  var random = +(Math.random() * 60).toFixed(2);
  var xAxisData = [];
  var yAxisData = [];
  let bmpShow = 0;
  for (var i = 10; i > 0; i--) {
    xAxisData.push(i + "秒前");
  }
  for (i = 1; i < 101; i++) {
    yAxisData.push(Math.round(Math.random() * 1e3));
  }
  var xdata = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var dyndata = [50, 50, 50, 50, 50, 50, 50];
  const _sfc_main$1 = {
    components: {
      echarts
    },
    data() {
      return {
        optionWidth: uni.getSystemInfoSync().windowWidth,
        optionHeight: uni.getSystemInfoSync().windowHeight,
        option: {},
        optionone: {},
        optiontwo: {},
        optiontwo2: {},
        optionthree: {},
        mbmpShow: 0
        //ws: null
      };
    },
    // onLoad() {
    // 	//__f__('log','at pages/index/index.vue:81','开始画图的尝试了...onLoad');
    // this.ws && this.ws.closeSocket();
    // this.ws = new WS(`${({}).VUE_APP_WS_API}/ws/wss://cws.liangzi-ai.com/ws`)  // xxx 表示接口地址URL
    // },
    // beforeDestroy() {
    // 	this.ws && this.ws.closeSocket();
    // 	},
    mounted() {
      this.optionWidth = uni.getSystemInfoSync().windowWidth / 2;
      this.optionHeight = uni.getSystemInfoSync().windowHeight;
      formatAppLog("log", "at pages/index/index.vue:92", "窗体宽度和高度是：", this.optionWidth, this.optionHeight);
      setInterval(
        () => {
          random = +(Math.random() * (1500 - 1e3 + 1) + 1e3).toFixed(2);
          random = parseInt(random);
          this.logstatrtone();
        },
        1389
      );
      setInterval(() => {
        bmpShow = Math.round(Math.random() * (180 - 40 + 1) + 40);
        yAxisData.push(bmpShow);
        yAxisData.shift();
        random = parseInt(random);
        this.logstatrttwo();
      }, 1200);
      this.logstatrtthree();
      setInterval(() => {
        this.logstatrt();
      }, 3e3);
    },
    methods: {
      //右上角的图一
      logstatrtone() {
        this.optionone = {
          tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
          },
          grid: {
            left: 5
            //bottom:5
          },
          series: [
            {
              color: "#e82107",
              name: "空气指标",
              type: "gauge",
              detail: { formatter: "{value}万", fontSize: 14 },
              label: {
                show: true,
                textStyle: {
                  color: "rgb(28, 255, 12)"
                }
              },
              data: [{ value: random, name: "负离子" }],
              //  表盘中央显示的值和字
              min: 0,
              max: 1500,
              //设置刻度盘内数值最大值
              splitNumber: 6,
              //设置间隔区域的显示数量
              axisLine: {
                // 坐标轴线 色块
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  width: 15,
                  color: [[0.2, "#e82107"], [0.5, "#f7ad1d"], [1, "#55ff00"]]
                  //  此处是将表盘分成的块数，0-1之间的小数，后面的颜色是每块的背景色
                }
              },
              axisLabel: {
                color: "#55ff00",
                distance: -50,
                //  文字距表盘的距离
                formatter: function(v) {
                  let c = parseInt(v);
                  switch (c + "") {
                    case "0":
                      return " ";
                    case "216":
                      return "轻载";
                    case "650":
                      return "正常";
                    case "1083":
                      return "重载";
                    case "1300":
                      return "过载";
                  }
                }
              },
              pointer: {
                //指针粗细
                width: 7,
                length: "68%"
              },
              title: {
                offsetCenter: [0, "-30%"]
                // x, y，单位px
              }
            }
          ]
        };
      },
      logstatrttwo() {
        this.mbmpShow = bmpShow;
        this.optiontwo = {
          animation: false,
          title: {
            textStyle: {
              fontSize: 10,
              color: "rgb(1, 191, 236)"
            },
            text: "心率(BPM)"
            /*,
            left:"110px"*/
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross"
            }
          },
          grid: {
            right: "20%",
            left: "30%",
            top: "20%",
            bottom: "5%",
            borderWidth: "0"
          },
          legend: {
            data: ["当前心率"],
            textStyle: { color: "#ff5500" }
            /*图例(legend)说明文字的颜色*/
          },
          xAxis: {
            axisLabel: {
              textStyle: {
                color: "#fff"
                // 修改 X 轴刻度标签的字体颜色为白色
              }
            },
            boundaryGap: false,
            data: xAxisData,
            show: false
          },
          yAxis: {
            //max:1000,
            //min:0,
            //interval:200,//间隔
            axisLabel: {
              show: false,
              textStyle: {
                color: "#ffffff"
              }
            },
            boundaryGap: false,
            splitLine: { show: true }
            /*网格线*/
          },
          dataZoom: [{
            type: "slider",
            show: true,
            xAxisIndex: [0],
            start: 100,
            end: 240,
            //初始化滚动条
            textStyle: {
              show: false
            },
            backgroundColor: "#fff",
            showDataShadow: true,
            //是否显示数据阴影 默认auto
            showDetail: false,
            //即拖拽时候是否显示详细数值信息 默认true
            handleSize: 35,
            startValue: 20,
            endValue: 300
          }],
          series: {
            /*itemStyle: {normal: {areaStyle: {type: 'default'}}},*/
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#ff6f4a"
                  /*折线的颜色*/
                },
                color: "#ff6f4a"
                /*图例(legend)的颜色,不是图例说明文字的颜色*/
              }
            },
            areaStyle: {
              normal: {
                color: "#ff6f4a"
                // new echarts.graphic.LinearGradient(
                //  0, 0, 0, 1,
                //  [
                // 	 { offset: 0, color: '#ff6f4a' },
                // 	 /* {offset: 0.5, color: '#c4e1ff'},*/
                // 	 { offset: 1, color: '#ecf5ff' }
                //  ]
                // )
              }
            },
            symbol: "none",
            /*去掉小圆点*/
            name: "当前心率",
            type: "line",
            data: yAxisData
            /*,
            smooth:true//显示为平滑的曲线*/
          }
        };
      },
      logstatrtthree() {
        this.optionthree = {
          tooltip: {},
          geo: {
            left: 10,
            right: "50%",
            //map: 'organ_diagram',
            selectedMode: "multiple",
            emphasis: {
              focus: "self",
              itemStyle: {
                color: null
              },
              label: {
                position: "bottom",
                distance: 0,
                textBorderColor: "#fff",
                textBorderWidth: 2
              }
            },
            blur: {},
            select: {
              itemStyle: {
                color: "#00ff00"
              },
              label: {
                show: false,
                textBorderColor: "#fff",
                textBorderWidth: 2
              }
            }
          },
          grid: {
            show: false,
            left: "10%",
            top: "10%",
            bottom: "10%"
          },
          xAxis: {
            axisLabel: {
              color: "#f60015"
            }
          },
          yAxis: {
            axisLabel: {
              color: "#aaff00"
              /* 				  formatter: function (val) {//百分比显示
              				    return val + '%';
              				  } */
            },
            data: [
              "心脏",
              "大肠",
              "小肠",
              "脾",
              "肾脏",
              "肺",
              "肝"
            ]
          },
          series: [
            {
              type: "bar",
              emphasis: {
                focus: "self"
              },
              data: [55, 65, 87, 29, 49, 32, 36]
            }
          ]
        };
      },
      logstatrt() {
        var myDate = new Date();
        var newdate = myDate;
        var xmm = "00";
        var xss = "00";
        for (var i2 = 0; i2 < 7; i2++) {
          newdate = new Date(myDate.getTime() + 1e3 * (i2 - 8));
          xmm = newdate.getMinutes().toString();
          if (xmm.length == 1) {
            xmm = "0" + xmm;
          }
          xss = newdate.getSeconds().toString();
          if (xss.length == 1) {
            xss = "0" + xss;
          }
        }
        xdata = ["分区压力", "全身软硬", "腿部压力", "臀部压力", "腰部压力", "肩部压力", "头部压力"];
        dyndata = [
          parseInt(Math.random() * (100 - 60 + 1) + 60),
          parseInt(Math.random() * (100 - 60 + 1) + 60),
          parseInt(Math.random() * (100 - 60 + 1) + 60),
          parseInt(Math.random() * (100 - 60 + 1) + 60),
          parseInt(Math.random() * (100 - 60 + 1) + 60),
          parseInt(Math.random() * (100 - 60 + 1) + 60),
          parseInt(Math.random() * (100 - 60 + 1) + 60)
        ];
        this.option = {
          // title: {
          // 	text: '压力曲线图'
          // },
          // 提示框信息配置项
          tooltip: {
            trigger: "axis"
            //extraCssText: 'transform: rotate(90deg)' //横屏展示需要将提示框也旋转90°，使显示正常
          },
          legend: {
            orient: "horizontal",
            left: "auto",
            top: "top",
            icon: "rect",
            nameRotate: -90,
            //坐标轴名字旋转，角度值。
            data: ["自适应", "人群平均", "历史值"],
            textStyle: {
              color: "rgb(1, 191, 236)"
            }
          },
          // 控制滚动条的配置项，这个dataZoom组件，默认控制x轴。
          dataZoom: [{
            /*
            inside为内置型数据区域缩放组件：
            		PC端：鼠标在坐标系范围内滚轮滚动（MAC触控板类同）
            		移动端：在移动端触屏上，支持两指滑动缩放。
            slider为滑动条型数据区域缩放组件：
            		滑动条型数据区域缩放组件提供了数据缩略图显示，缩放，刷选，拖拽，点击快速定位等数据筛选的功能
             */
            type: "slider",
            //start: 10, // 左边在 10% 的位置。
            //end: 80, // 右边在 60% 的位置。
            zoomOnMouseWheel: true,
            // 设置鼠标滚轮可以触发图表缩放
            moveOnMouseMove: true,
            // 鼠标移动能触发数据窗口平移
            orient: "vertical",
            // 控制横纵屏的滚动条位置
            left: "left"
            // 调试滚动条的具体位置
          }],
          yAxis: {
            type: "category",
            data: xdata,
            //inverse: 'true', //是否是反向坐标轴。
            axisLabel: {
              rotate: -90,
              textStyle: { color: "gold" }
            }
          },
          xAxis: {
            type: "value",
            //数据
            min: 0,
            max: 100,
            position: "top",
            //x 轴的位置【top bottom】
            nameRotate: -90,
            //坐标轴名字旋转，角度值。
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              rotate: 90,
              //刻度标签旋转的角度，
              textStyle: { color: "gold" }
            },
            scale: true
            //是否是脱离 0 值比例
          },
          series: [
            {
              name: "历史值",
              type: "line",
              stack: "Total",
              smooth: true,
              showSymbol: true,
              emphasis: {
                focus: "series"
              },
              data: [79, 65, 80, 63, 45, 33, 47]
            },
            {
              name: "自适应",
              type: "line",
              smooth: true,
              showSymbol: true,
              areaStyle: {
                opacity: 0.8,
                color: "rgb(128, 255, 165)"
                // color: new graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                // 	offset: 0,
                // 	color: 'rgb(128, 255, 165)'
                //   },
                //   {
                // 	offset: 1,
                // 	color: 'rgb(1, 191, 236)'
                //   }
                // ])
              },
              label: {
                show: true,
                rotate: 270,
                position: "top",
                textStyle: {
                  color: "rgb(255, 255, 255)"
                }
              },
              emphasis: {
                focus: "series"
              },
              data: dyndata
            },
            {
              name: "人群平均",
              type: "line",
              smooth: true,
              label: {
                show: true,
                rotate: 270,
                position: "top"
              },
              emphasis: { focus: "series" },
              data: [60, 20, 55, 10, 30, 20, 10]
            }
          ]
        };
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_echarts = vue.resolveComponent("echarts");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "row" }, [
        vue.createCommentVNode("//右一栏安卓平板可以高度设置为795，宽度为300位内容可以设置苹果的高度下降成751，屏幕宽度为150让整屏内容可以进行显示使用"),
        vue.createElementVNode("view", { class: "col-4 bg-red" }, [
          vue.createVNode(_component_echarts, {
            option: $data.optionone,
            style: { "height": "calc(100% - 1px)", "width": "calc(100% - 1px)", "transform": "rotate(90deg)" }
          }, null, 8, ["option"]),
          vue.createElementVNode("view", { style: { "transform": "rotate(90deg)", "color": "greenyellow", "font-size": "16px", "text-align": "center" } }, " 空气负离子指数 ")
        ]),
        vue.createCommentVNode("//右二栏位内容"),
        vue.createElementVNode("view", { class: "col-4 bg-green" }, [
          vue.createVNode(_component_echarts, {
            option: $data.optiontwo,
            style: { "right": "0%", "height": "calc(100% - 1px)", "width": "calc(100% - 1px)", "transform": "rotate(90deg)" }
          }, null, 8, ["option"]),
          vue.createCommentVNode('<echarts :option="optiontwo2" style="height:108px;width: 180px;transform:rotate(90deg);"></echarts>'),
          vue.createElementVNode(
            "view",
            { style: { "transform": "rotate(90deg)", "color": "greenyellow", "font-size": "16px", "text-align": "center" } },
            " 心率监测" + vue.toDisplayString($data.mbmpShow) + "次/分钟(BMP) ",
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode("//右三栏位内容"),
        vue.createElementVNode("view", { class: "col-4 bg-blue" }, [
          vue.createElementVNode("view", { style: { "background-image": "url('/static/human2.png')", "transform": "rotate(-90deg) scale(1, -1)", "background-size": "cover", "background-position": "left center", "height": "216px", "width": "200px" } }, [
            vue.createVNode(_component_echarts, {
              option: $data.optionthree,
              style: { "height": "calc(100% - 1px)", "width": "calc(100% - 1px)", "transform": "rotate(180deg) scale(1, -1)" }
            }, null, 8, ["option"])
          ]),
          vue.createElementVNode("view", { style: { "transform": "rotate(90deg)", "color": "greenyellow", "font-size": "16px", "text-align": "center" } }, " 人体部位频率 ")
        ])
      ]),
      vue.createElementVNode("view", { class: "row" }, [
        vue.createElementVNode("view", { class: "col-12 bg-yellow" }, [
          vue.createCommentVNode(` <view style="transform:rotate(90deg);"><text style="color:'#e82107'">左</text></view> `),
          vue.createVNode(_component_echarts, {
            option: $data.option,
            style: { "height": "calc(100% - 1px)", "width": "calc((100% - 1px))" }
          }, null, 8, ["option"]),
          vue.createCommentVNode(` <view style="transform:rotate(90deg);"><text style="color:'#e82107'">右</text></view> `)
        ])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/AppProjects/UITester/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
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
