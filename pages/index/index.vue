<template>
  <div class="container" :class="{ 'landscape': isLandscape }">
    <div class="row">
      <div class="col" v-for="(item, index) in top" :key="index" :style="{ 'background-color': item.color }">
        {{ item.text }}
      </div>
    </div>
    <div class="row">
      <div class="col" v-for="(item, index) in bottom" :key="index" :style="{ 'background-color': item.color }">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLandscape: false,
      top: [
        { text: 'Column 1', color: '#f44336' },
        { text: 'Column 2', color: '#2196f3' },
        { text: 'Column 3', color: '#4caf50' },
      ],
      bottom: [
        { text: 'Bottom Row', color: '#9c27b0' },
      ]
    }
  },
  mounted() {
    window.addEventListener('orientationchange', this.handleOrientationChange)
    this.handleOrientationChange()
  },
  destroyed() {
    window.removeEventListener('orientationchange', this.handleOrientationChange)
  },
  methods: {
    handleOrientationChange() {
      this.isLandscape = window.orientation === 90 || window.orientation === -90;
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.landscape .row {
  flex-direction: row;
  height: 50%;
}

.landscape .row:first-child .col {
  width: 33.33%;
}

.landscape .row:last-child .col {
  width: 100%;
}

.row {
  display: flex;
  flex: 1;
}

.col {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #fff;
}
</style>
