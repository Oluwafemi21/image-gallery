<template>
  <BaseModal :showModal="viewPhoto" @closeModal="closePhotoViewer">
    <template #body>
      <div class="modal_image">
        <img :src="imageInfo.url" :alt="`Image showing ...`" />
      </div>
      <div class="modal_image_content">
        <p>{{ imageInfo.title }}</p>
        <span>{{ imageInfo.location }}</span>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import type { ImageInfo } from '@/utils/image.types.ts'
defineProps<{
  viewPhoto: boolean
  imageInfo: ImageInfo
}>()

const emit = defineEmits(['closePhoto'])

const closePhotoViewer = () => {
  emit('closePhoto')
}
</script>

<style scoped lang="scss">
.modal_image {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.modal_image_content {
  padding: 20px 30px;
  p {
    font-weight: 600;
    font-size: 18px;
  }
  span {
    font-size: 14px;
  }
}
</style>
