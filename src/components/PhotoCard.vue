<template>
  <div class="photo_card_container" @click="previewImage" tabindex="0">
    <div class="photo_card">
      <img :src="imageInfo.urls.regular" :alt="imageInfo.alt_description" loading="lazy" />
      <div class="photo_card_content">
        <p>{{ imageInfo.user.first_name }}</p>
        <span>{{ imageInfo.user.location }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UnsplashImage } from '@/utils/image.types'
const emit = defineEmits(['viewImage'])

const { imageInfo } = defineProps<{
  imageInfo: UnsplashImage
}>()

const previewImage = () => {
  emit('viewImage', imageInfo)
}
</script>

<style scoped lang="scss">
@import './../assets/styles/utils/variables';

.photo_card_container {
  border-radius: 8px;
  position: relative;
  height: 100%;
  cursor: pointer;

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
      color: white;
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
        margin-bottom: 5px;
      }

      span {
        font-size: 12px;
        font-weight: 400;
        letter-spacing: -1%;
      }
    }
  }

  &:hover,
  &:focus {
    transform: scale(1.02);
    transition: transform 200ms ease;
  }
}
</style>
