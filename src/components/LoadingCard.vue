<template>
  <div class="loading_box">
    <div class="content_loading_state">
      <div class="loading_long"></div>
      <div class="loading_short"></div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@import './../assets/styles/utils/mixins';

.loading_box {
  position: relative;
  padding: 16px;
  border-radius: 8px;
  @include animate;

  .content_loading_state {
    position: absolute;
    bottom: 16px;
    left: 16px;
    .loading_long {
      height: 12px;
      width: 125px;
      margin-bottom: 8px;
      background-color: rgba($color: #ccc, $alpha: 0.7);
    }
    .loading_short {
      height: 12px;
      width: 80px;
      background-color: rgba($color: #ccc, $alpha: 0.7);
    }
  }
}
</style>
