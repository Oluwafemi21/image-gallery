<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import PhotoCard from '@/components/PhotoCard.vue'
import LoadingCard from '@/components/LoadingCard.vue'
import BaseModal from '@/components/BaseModal.vue'
import type { UnsplashImage } from '@/utils/image.types'
import { useDebounceFn } from '@vueuse/core'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const fetchingImages = ref(false)
const isModalOpen = ref(false)
const previewingImage = ref<UnsplashImage | null>(null)
const searchInput = ref('')
const results = ref<UnsplashImage[] | []>([])

const closeImageModal = () => {
  isModalOpen.value = false
  previewingImage.value = null
}

const previewImage = (image: UnsplashImage) => {
  previewingImage.value = image
  isModalOpen.value = true
}

const fetchImages = async (keyword: string) => {
  fetchingImages.value = true
  const search = keyword.toLowerCase()
  await axios
    .get(
      `https://api.unsplash.com/search/photos?query=${search}&per_page=6&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
    )
    .then((data) => {
      results.value = data.data.results
    })
    .catch((err) => console.error(err))
    .finally(() => (fetchingImages.value = false))
}

onMounted(() => {
  fetchImages('african')
})

const debouncedFn = useDebounceFn(() => {
  fetchImages(searchInput.value)
}, 800)

const onInputChange = () => {
  debouncedFn()
}

const clearSearch = () => {
  searchInput.value = ''
  results.value = []
  fetchImages('african')
}
</script>

<template>
  <div class="search-box">
    <div class="search-box-container">
      <div class="search-input" v-if="!fetchingImages">
        <IconSearch />
        <input
          type="search"
          placeholder="Search for photo"
          v-model="searchInput"
          @input="onInputChange"
        />
      </div>
      <div v-else>
        <p>
          {{ fetchingImages ? 'Searching' : 'Search Results' }} for <span>"{{ searchInput }}"</span>
        </p>
        <button @click="clearSearch">Clear search</button>
      </div>
    </div>
  </div>
  <section class="image-section">
    <template v-if="fetchingImages">
      <LoadingCard v-for="i in 6" :key="i" />
    </template>
    <div v-else-if="!fetchingImages && results.length < 1" class="no_results">
      <p>No results found for {{ searchInput }}</p>
    </div>
    <PhotoCard
      v-for="image in results"
      :image-info="image"
      :key="image.id"
      v-else
      @view-image="previewImage"
    />
  </section>

  <BaseModal :show-modal="isModalOpen" @close-modal="closeImageModal">
    <template #body>
      <div class="image-modal">
        <img :src="previewingImage?.urls.regular" :alt="previewingImage?.alt_description" />
        <div class="content">
          <p>{{ previewingImage?.user.first_name }}</p>
          <span>{{ previewingImage?.user.location }}</span>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
