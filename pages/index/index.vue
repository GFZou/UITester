<template>
  <view class="container">
    <view class="row">
      <view class="col-4 bg-red">1</view>
      <view class="col-4 bg-green">2</view>
      <view class="col-4 bg-blue">3</view>
    </view>
    <view class="row">
      <view class="col-12 bg-yellow">4</view>
    </view>
  </view>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.row {
  display: flex;
  flex: 1;
}

.col-4 {
  flex-basis: 33.33%;
}

.col-12 {
  flex-basis: 100%;
}

@media screen and (orientation: landscape) {
  .row {
    flex-direction: row;
  }

  .col-4 {
    flex-basis: 25%;
  }

  .col-12 {
    flex-basis: 50%;
  }
}

.bg-red {
  background-color: red;
}

.bg-green {
  background-color: green;
}

.bg-blue {
  background-color: blue;
}

.bg-yellow {
  background-color: yellow;
}
</style>
