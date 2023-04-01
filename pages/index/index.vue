<template>
	<view class="container">
		<view class="top-container">
			<!--//右一栏安卓平板可以高度设置为795，宽度为300位内容可以设置苹果的高度下降成751，屏幕宽度为150让整屏内容可以进行显示使用-->
			<view class="top-item red">
				<view style="color: greenyellow;font-size: 16px;text-align: center">
					空气负离子指数
				</view>
				<echarts :option="optionone"
					style="height:calc(100% - 1px);width:calc(100% - 1px);"></echarts>
			</view>

			<!--//右二栏位内容-->
			<view class="top-item green">
				<view style="color: greenyellow;font-size: 16px;text-align: center">
					心率监测{{mbmpShow}}次/分钟(BMP)
				</view>
				<echarts :option="optiontwo"
					style="right: 0%; height:100%;width:calc(100% - 1px);">
				</echarts>
				<!--<echarts :option="optiontwo2" style="height:108px;width: 180px;transform:rotate(90deg);"></echarts>-->
			</view>

			<!--//右三栏位内容transform: rotate(-90deg) scale(1, -1);-->
			<view class="top-item blue">
				<view style="color: greenyellow;font-size: 16px;text-align: center">
					人体部位频率
				</view>
				<view
					style="background-image: url('/static/human2.png'); background-size:cover ; background-position: left center;height:216px;width: 200px;">
					<echarts :option="optionthree"
						style="height:100vh;width:100vh;transform: rotate(180deg) scale(1, -1);">
					</echarts>
				</view>
			</view>
		</view>

		<view class="bottom-container">
			<view class="bottom-item">
				<!-- <view style="transform:rotate(90deg);"><text style="color:'#e82107'">左</text></view> -->
				<echarts :option="option" style="right:0%;transform:rotate(-90deg);height:100%;width:100%"></echarts>
				<!-- <view style="transform:rotate(90deg);"><text style="color:'#e82107'">右</text></view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import echarts from '@/components/echarts.vue';
	// import WS from "@/utils/websocket.js"
	//右一公共变量
	var random = +(Math.random() * 60).toFixed(2);

	//右二的公共变量
	var xAxisData = [];
	var yAxisData = [];
	let bmpShow = 0;
	for (var i = 10; i > 0; i--) {
		xAxisData.push(i + "秒前");
	}
	for (i = 1; i < 101; i++) {
		yAxisData.push(Math.round(Math.random() * 1000));
	}
	//左边压力公共变量
	var xdata = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	var dyndata = [50, 50, 50, 50, 50, 50, 50];

	export default {
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
				mbmpShow: 0,
				//ws: null
			};
		},

		// onLoad() {
		// 	//console.log('开始画图的尝试了...onLoad');
		// this.ws && this.ws.closeSocket();

		// this.ws = new WS(`${process.env.VUE_APP_WS_API}/ws/wss://cws.liangzi-ai.com/ws`)  // xxx 表示接口地址URL
		// },
		// beforeDestroy() {
		// 	this.ws && this.ws.closeSocket();
		// 	},
		destroyed(){
			window.removeEventListener('resize',this.handleResize);
		},
		mounted() {
			window.addEventListener('resize', this.handleResize)
			this.optionWidth = uni.getSystemInfoSync().windowWidth;
			this.optionHeight = uni.getSystemInfoSync().windowHeight;
			console.log("窗体宽度和高度是：", this.optionWidth, this.optionHeight);
			//this.logstatrtone();

			setInterval(() => {
				random = +(Math.random() * (1500 - 1000 + 1) + 1000).toFixed(2);
				//console.log('右一图更新了...',random);
				random = parseInt(random);
				this.logstatrtone();
			}, 1389);

			//https://blog.csdn.net/weixin_44547635/article/details/118726060
			setInterval(() => {
				bmpShow = Math.round(Math.random() * (180 - 40 + 1) + 40);
				yAxisData.push(bmpShow);
				yAxisData.shift();
				//console.log('右二图更新了...',random);
				random = parseInt(random);
				this.logstatrttwo();
			}, 1200);

			this.logstatrtthree();
			setInterval(() => {
				this.logstatrt();
			}, 3000);
			// this.ws.getWebSocketMsg(data => {
			// const dataJson = data;
			// console.log('data', dataJson);
			// 		if(typeof(dataJson) == "object") {
			// 			console.log("wsObject", dataJson);
			// }else {
			// 			console.log(dataJson);
			//   }
			// });
			//https://blog.csdn.net/sinat_35272898/article/details/122511603
		},
		methods: {
			//
			handleResize(){
				//判断是否处于横屏的状态，如果是竖屏则进行横屏的设定
				const isLandscape = window.innerWidth>window.innerHeight;
				if(isLandscape == false)
				{
					//如果是竖屏则进行切换成横屏
					uni.setScreenOrientation({orientation:'Landscape'})
				}
			},
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
					series: [{
						color: '#e82107',
						name: '空气指标',
						type: 'gauge',
						detail: {
							formatter: '{value}万',
							fontSize: 14,
						},
						label: {
							show: true,
							textStyle: {
								color: 'rgb(28, 255, 12)'
							}
						},
						data: [{
							value: random,
							name: '负离子'
						}], //  表盘中央显示的值和字
						min: 0,
						max: 1500, //设置刻度盘内数值最大值
						splitNumber: 6, //设置间隔区域的显示数量
						axisLine: { // 坐标轴线 色块
							lineStyle: { // 属性lineStyle控制线条样式
								width: 15,
								color: [
									[0.2, '#e82107'],
									[0.5, '#f7ad1d'],
									[1, '#55ff00']
								] //  此处是将表盘分成的块数，0-1之间的小数，后面的颜色是每块的背景色
							}
						},
						axisLabel: {
							color: '#55ff00',
							distance: -50, //  文字距表盘的距离
							formatter: function(v) {
								let c = parseInt(v)
								switch (c + '') { // 这是每块的注释，算法是刻度最大值/设置间隔区域的显示数量，我这里是1300/6，具体显示位置自己根据需要调节
									case '0':
										return ' ';
									case '216':
										return '轻载';
									case '650':
										return '正常';
									case '1083':
										return '重载';
									case '1300':
										return '过载';
								}
							}
						},
						pointer: { //指针粗细
							width: 7,
							length: '68%'
						},
						title: {
							offsetCenter: [0, '-30%'], // x, y，单位px
						},
					}]
				};
			},
			logstatrttwo() {
				this.mbmpShow = bmpShow;
				this.optiontwo = {
					animation: false,
					title: {
						textStyle: {
							fontSize: 10,
							color: 'rgb(1, 191, 236)'
						},
						text: '心率(BPM)'
						/*,
						            left:"110px"*/
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					grid: {
						right: '20%',
						left: '30%',
						top: '20%',
						bottom: '5%',
						borderWidth: "0"
					},
					legend: {
						data: ['当前心率'],
						textStyle: {
							color: "#ff5500"
						},
						/*图例(legend)说明文字的颜色*/
					},
					xAxis: {
						axisLabel: {
							textStyle: {
								color: '#fff' // 修改 X 轴刻度标签的字体颜色为白色
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
								color: '#ffffff',
							},
						},
						boundaryGap: false,
						splitLine: {
							show: true
						} /*网格线*/
					},
					dataZoom: [{
						type: 'slider',
						show: true,
						xAxisIndex: [0],
						start: 100,
						end: 240, //初始化滚动条
						textStyle: {
							show: false
						},
						backgroundColor: '#fff',
						showDataShadow: true, //是否显示数据阴影 默认auto
						showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
						handleSize: 35,
						startValue: 20,
						endValue: 300
					}],
					series: {
						/*itemStyle: {normal: {areaStyle: {type: 'default'}}},*/
						itemStyle: {
							normal: {
								lineStyle: {
									color: '#ff6f4a' /*折线的颜色*/
								},
								color: "#ff6f4a" /*图例(legend)的颜色,不是图例说明文字的颜色*/
							}
						},
						areaStyle: {
							normal: {
								color: '#ff6f4a',
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
						name: '当前心率',
						type: 'line',
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
						right: '50%',
						//map: 'organ_diagram',
						selectedMode: 'multiple',
						emphasis: {
							focus: 'self',
							itemStyle: {
								color: null
							},
							label: {
								position: 'bottom',
								distance: 0,
								textBorderColor: '#fff',
								textBorderWidth: 2
							}
						},
						blur: {},
						select: {
							itemStyle: {
								color: '#00ff00'
							},
							label: {
								show: false,
								textBorderColor: '#fff',
								textBorderWidth: 2
							}
						}
					},
					grid: {
						show: false,
						left: '10%',
						top: '10%',
						bottom: '10%'
					},
					xAxis: {
						axisLabel: {
							color: '#f60015',
						}
					},
					yAxis: {
						axisLabel: {
							color: '#aaff00',
							/* 				  formatter: function (val) {//百分比显示
											    return val + '%';
											  } */
						},
						data: [
							'心脏',
							'大肠',
							'小肠',
							'脾',
							'肾脏',
							'肺',
							'肝'
						]
					},
					series: [{
						type: 'bar',
						emphasis: {
							focus: 'self'
						},
						data: [55, 65, 87, 29, 49, 32, 36]
					}]
				};
			},
			logstatrt() {
				//console.log("我调用了更新数据了...");
				var myDate = new Date();
				var newdate = myDate;
				var xmm = '00';
				var xss = '00';
				var timex = ['', '', '', '', '', '', ''];

				for (var i = 0; i < 7; i++) {
					//对应时间
					newdate = new Date(myDate.getTime() + 1000 * (i - 8));
					xmm = newdate.getMinutes().toString();
					if (xmm.length == 1) {
						xmm = '0' + xmm;
					}
					xss = newdate.getSeconds().toString();
					if (xss.length == 1) {
						xss = '0' + xss;
					}
					timex[i] = xmm + ':' + xss;

					//console.log(newdate.toString());
				};
				//xdata=[timex[0],timex[1],timex[2],timex[3],timex[4],timex[5],timex[6]];
				//console.log(xdata);
				//xdata=["头部压力","肩部压力","腰部压力","臀部压力","腿部压力","全身软硬","分区压力"];
				xdata = ["分区压力", "全身软硬", "腿部压力", "臀部压力", "腰部压力", "肩部压力", "头部压力"];

				dyndata = [parseInt(Math.random() * (100 - 60 + 1) + 60), parseInt(Math.random() * (100 - 60 + 1) + 60),
					parseInt(Math.random() * (100 - 60 + 1) + 60), parseInt(Math.random() * (100 - 60 + 1) + 60),
					parseInt(Math.random() * (100 - 60 + 1) + 60), parseInt(Math.random() * (100 - 60 + 1) + 60),
					parseInt(Math.random() * (100 - 60 + 1) + 60)
				];

				// dyndata=[10,parseInt(getApp().globalData.DynDatas[5]),parseInt(getApp().globalData.DynDatas[4]),
				// 	parseInt(getApp().globalData.DynDatas[3]),parseInt(getApp().globalData.DynDatas[2]),
				// 	parseInt(getApp().globalData.DynDatas[1]),parseInt(getApp().globalData.DynDatas[0])
				// 	]
				//console.log("全局当前数据是",getApp().globalData.DynDatas);

				this.option = {
					// title: {
					// 	text: '压力曲线图'
					// },
					// 提示框信息配置项
					tooltip: {
						trigger: 'axis',
						//extraCssText: 'transform: rotate(90deg)' //横屏展示需要将提示框也旋转90°，使显示正常
					},
					legend: {
						orient: 'horizontal',
						left: 'auto',
						top: 'top',
						icon: 'rect',
						nameRotate: -90, //坐标轴名字旋转，角度值。
						data: ['自适应', '人群平均', '历史值'],
						textStyle: {
							color: 'rgb(1, 191, 236)'
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
						type: 'slider',
						//start: 10, // 左边在 10% 的位置。
						//end: 80, // 右边在 60% 的位置。
						zoomOnMouseWheel: true, // 设置鼠标滚轮可以触发图表缩放
						moveOnMouseMove: true, // 鼠标移动能触发数据窗口平移
						orient: 'vertical', // 控制横纵屏的滚动条位置
						left: 'left' // 调试滚动条的具体位置
					}],
					yAxis: {
						type: 'category',
						data: xdata,
						//inverse: 'true', //是否是反向坐标轴。
						axisLabel: {
							rotate: -90,
							textStyle: {
								color: 'gold'
							}
						}
					},
					xAxis: {
						type: 'value', //数据
						min: 0,
						max: 100,
						position: 'top', //x 轴的位置【top bottom】
						nameRotate: -90, //坐标轴名字旋转，角度值。
						axisLabel: {
							//坐标轴刻度标签的相关设置。
							rotate: 90, //刻度标签旋转的角度，
							textStyle: {
								color: 'gold'
							}
						},
						scale: true //是否是脱离 0 值比例
					},
					series: [{
							name: '历史值',
							type: 'line',
							stack: 'Total',
							smooth: true,
							showSymbol: true,
							emphasis: {
								focus: 'series'
							},
							data: [79, 65, 80, 63, 45, 33, 47]
						},
						{
							name: '自适应',
							type: 'line',
							smooth: true,
							showSymbol: true,
							areaStyle: {
								opacity: 0.8,
								color: 'rgb(128, 255, 165)'
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
								position: 'top',
								textStyle: {
									color: 'rgb(255, 255, 255)'
								}
							},
							emphasis: {
								focus: 'series'
							},
							data: dyndata
						},

						{
							name: '人群平均',
							type: 'line',
							smooth: true,
							label: {
								show: true,
								rotate: 270,
								position: 'top'
							},
							emphasis: {
								focus: 'series'
							},
							data: [60, 20, 55, 10, 30, 20, 10]
						}
					]
				};
			}
		},
	};
</script>

<style>
	.container {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.top-container {
		display: flex;
		flex-direction: row;
		flex: 1;
		height: 50vh;/*占居容器50%的高度*/
	}

	.top-item {
		flex: 1;
	}

	.red {
		background-color: black;
	}

	.green {
		background-color: black;
	}

	.blue {
		background-color: black;
	}

	.bottom-container {
		flex: 1;
		background-color: black;
		display:flex;
		flex-direction:column;
		height: 50vh;
	}

	.bottom-item {
		width: 100%;
		height: 100%;
	}
	@media screen and (orientation: landscape) {
	  .bottom-item {
	    height: 100%; // 设置一个固定高度
			width: 100%;
	  }
	}

</style>

<!--
<style>
  .container {
		/*transform:rotate(-90deg);*/
    display: flex;
    flex-direction: row;
    height: 100%;
		background-color: #000000;
  }

  .left {
    flex: 1;
    background-color: #000000;
  }

  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .right-col {
    flex: 1;
		/*background-color: #3f3f3f;
    background-color: #d1d1d1;
    margin: 5px;
    //height: 33.33%;*/
		display:flex;
		justify-content:center;
		align-items:center;  /* 竖屏样式 */
		height: 100%;
		width: 33.33%;
		background-color: yellow;
  }

	@media screen and (orientation:landscape) {
	  .right-col {
				/* 横屏样式 */
			flex: 1;
			/*background-color: #3f3f3f;
			background-color: #d1d1d1;
			margin: 5px;
			//height: 33.33%;*/
			display:flex;
			justify-content:center;
			align-items:center;  /* 竖屏样式 */
			height: 100%;
			width: 33.33%;
	    background-color: green;
		}
	}
</style>
首先，我们使用<view>标签作为容器，并将其设置为display: flex。这允许我们使用Flexbox布局来分割页面。

我们设置容器的flex-direction属性为row，这意味着我们想要在水平方向上分割容器。然后我们设置left类的flex属
性为1，这意味着左侧栏应该占据容器中的1/2宽度。

接下来，我们将右侧栏的display属性设置为flex，并将其flex-direction属性设置为column，这意味着我们想要在垂
直方向上分割右侧栏。然后，我们设置right-col类的flex属性为1，这意味着每个右侧栏应该均分右侧栏的高度。

最后，我们设置一些背景颜色和边距，以使界面更具可读性。 -->
