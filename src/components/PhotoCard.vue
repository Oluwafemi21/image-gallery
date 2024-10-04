<template>
  <div class="photo_card_container" :class="{ loading: loading }">
    <div class="photo_card" v-if="!loading">
      <img :src="imageInfo.url" />
      <div class="photo_card_content">
        <p>{{ imageInfo.title }}</p>
        <span>{{ imageInfo.location }}</span>
      </div>
    </div>
    <div v-else class="content_loading_state">
      <div class="loading_long"></div>
      <div class="loading_short"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageInfo } from '@/utils/image.types'
defineProps<{
  loading: boolean
  imageInfo: ImageInfo
}>()
</script>

<style scoped lang="scss">
@import './../assets/styles/utils/mixins';
@import './../assets/styles/utils/variables';

.photo_card_container {
  border-radius: 8px;
  position: relative;
  height: 100%;

  .photo_card {
    position: relative;
    height: 100%;

    img {
      border-radius: 8px;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    &_content {
      position: absolute;
      padding: 16px;
      border-radius: 0 0 8px 8px;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);

      p {
        font-weight: 500;
        font-size: $font-size-base;
        margin-bottom: 6px;
      }

      span {
        font-size: 14px;
        color: #8b8f91;
      }
    }
  }

  &.loading {
    padding: 16px;
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
}
</style>
