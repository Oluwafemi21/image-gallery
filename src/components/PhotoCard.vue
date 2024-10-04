<template>
  <div class="photo_card_container">
    <div class="photo_card">
      <img :src="imageInfo.url" />
      <div class="photo_card_content">
        <p>{{ imageInfo.title }}</p>
        <span>{{ imageInfo.location }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageInfo } from '@/utils/image.types'
defineProps<{
  imageInfo: ImageInfo
}>()
</script>

<style scoped lang="scss">
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
}
</style>
