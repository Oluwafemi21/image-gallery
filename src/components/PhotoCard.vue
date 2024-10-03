<template>
  <div class="photo_card_container">
    <div class="photo_card">
        <template v-if="!loading">
            <img :src="imageInfo.url"/>
        <div class="photo_card_content">
            <p>{{ imageInfo.title }}</p>
            <span>{{ imageInfo.location }}</span>
        </div>
        </template>
        <div v-else class="content_loading_state">
            <div></div>
            <div></div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ImageInfo } from '@/utils/image.types.ts'
defineProps<{
    loading: boolean,
    imageInfo: ImageInfo
}>()
</script>

<style scoped lang="scss">
.photo_card_container {
    border-radius: 8px;
    
    &.loading{
        padding:8px;
        background-color: #ccc;

        .photo_card {
            .content_loading_state {
                position:absolute;
                bottom: 0;
                 &:first {
                    height: 16px;
                    width:150px;
                    background-color: rgba($color: #ccc, $alpha: 0.7);
                 }
            }
        }
    }

    .photo_card {
        position:relative;

        &_content{ 
            p {
                font-weight: 500;
                font-size: 16px;
                margin-bottom:6px;
            }

            span {
                font-size: 14px;
            }
        }
    }
}
</style>