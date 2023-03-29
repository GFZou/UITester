<template>
  <view class="container" ref="container">
    <view class="row">
      <view class="col col1"></view>
      <view class="col col2"></view>
      <view class="col col3"></view>
    </view>
    <view class="row">
      <view class="col col4"></view>
    </view>
  </view>
</template>

<script>
export default {
  mounted() {
    // 监听屏幕旋转事件，切换布局
    window.addEventListener('orientationchange', this.handleOrientationChange)
    this.handleOrientationChange()
  },
  beforeDestroy() {
    // 移除屏幕旋转事件监听
    window.removeEventListener('orientationchange', this.handleOrientationChange)
  },
  methods: {
    // 根据屏幕方向切换布局
    handleOrientationChange() {
      if (window.orientation === 90 || window.orientation === -90) {
        // 横屏状态，左右两侧各占一栏，中间部分占三栏
        this.$refs.container.style.flexDirection = 'row'
        this.$refs.container.style.height = '100%'
        this.$refs.container.style.width = '100%'
        this.$refs.container.style.marginTop = '0'
        this.$refs.container.style.marginBottom = '0'
        this.$refs.container.style.marginLeft = '0'
        this.$refs.container.style.marginRight = '0'
        this.$refs.container.style.display = 'flex'
        this.$refs.container.style.alignItems = 'stretch'
        this.$refs.container.style.justifyContent = 'center'
        this.$refs.container.style.overflow = 'hidden'

        this.$refs.container.children[0].style.height = '100%'
        this.$refs.container.children[0].style.width = '66.66%'

        this.$refs.container.children[1].style.height = '100%'
        this.$refs.container.children[1].style.width = '33.33%'
      } else {
        // 竖屏状态，上半部分均分成三栏，下半部分占一栏
        this.$refs.container.style.flexDirection = 'column'
        this.$refs.container.style.height = '100%'
        this.$refs.container.style.width = '100%'
        this.$refs.container.style.marginTop = '0'
        this.$refs.container.style.marginBottom = '0'
        this.$refs.container.style.marginLeft = '0'
        this.$refs.container.style.marginRight = '0'
        this.$refs.container.style.display = 'flex'
        this.$refs.container.style.alignItems = 'stretch'
        this.$refs.container.style.justifyContent = 'center'
        this.$refs.container.style.overflow = 'hidden'

        this.$refs.container.children[0].style.height = '33.33%'
        this.$refs.container.children[0].style.width = '100%'

        this.$refs.container.children[1].style.height = '33.33%'
        this.$refs.container.children[1].style.width = '100%'

        this.$refs.container.children[2].style.height = '33.33%'
        this.$refs.container.children[2].style.width = '100%'

        this.$refs.container.children[3].style.height = '33.33%'
        this.$refs.container.children[3].style.width = '100%'
      }
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.row {
  display: flex;
  flex: 1;
  width: 100%;
}

.col {
  height: 100%;
}

.col-1 {
  flex: 1;
  background-color: red;
}

.col-2 {
  flex: 1;
  background-color: blue;
}

.col-3 {
  flex: 1;
  background-color: green;
}

.col-4 {
  flex: 1;
  background-color: yellow;
}

@media screen and (orientation: landscape) {
  .row {
    flex-direction: row;
  }
  .col-1 {
    flex-basis: 33.33%;
  }
  .col-2 {
    flex-basis: 33.33%;
  }
  .col-3 {
    flex-basis: 33.33%;
  }
  .col-4 {
    flex-basis: 100%;
  }
}
</style>
