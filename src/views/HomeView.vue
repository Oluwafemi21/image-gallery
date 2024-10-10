<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import PhotoCard from '@/components/PhotoCard.vue'
import LoadingCard from '@/components/LoadingCard.vue'
import BaseModal from '@/components/BaseModal.vue'
import type { UnsplashImage } from '@/utils/image.types'
import { useDebounceFn, useOnline } from '@vueuse/core'
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import IconNetwork from '@/components/icons/IconNetwork.vue'

const fetchingImages = ref(false)
const isModalOpen = ref(false)
const previewingImage = ref<UnsplashImage | null>(null)
const searchInput = ref('')
const searchQuery = ref('african')
const results = ref<UnsplashImage[] | []>([])
const online = useOnline()
const closeImageModal = () => {
  isModalOpen.value = false
  previewingImage.value = null
}

const previewImage = (image: UnsplashImage) => {
  previewingImage.value = image
  isModalOpen.value = true
}

const fetchImages = async (keyword: string) => {
  if (!online) return
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
  fetchImages(searchQuery.value)
})

const debouncedFn = useDebounceFn(() => {
  if (searchInput.value && online) {
    searchQuery.value = searchInput.value
    fetchImages(searchInput.value)
  }
}, 800)

const onInputChange = () => {
  debouncedFn()
}

const clearSearch = () => {
  searchInput.value = ''
  searchQuery.value = 'african'
  fetchImages(searchQuery.value)
}

watch(online, (isOnline) => {
  if (!isOnline) {
    results.value = []
  } else {
    fetchImages(searchQuery.value)
  }
})
</script>

<template>
  <div class="search-box">
    <div class="search-box-container">
      <div class="search-input" v-if="searchInput !== searchQuery && !fetchingImages">
        <IconSearch />
        <input
          type="search"
          placeholder="Search for photo"
          v-model.trim="searchInput"
          @input="onInputChange"
        />
      </div>
      <div v-else>
        <p v-if="fetchingImages && searchInput">
          Searching for <span>"{{ searchQuery }}"</span>
        </p>
        <p v-else>
          Search Results for <span>"{{ searchQuery }}"</span>
        </p>
        <button @click="clearSearch">Clear search</button>
      </div>
    </div>
  </div>
  <section class="image-section">
    <template v-if="online">
      <template v-if="fetchingImages">
        <LoadingCard v-for="i in 6" :key="i" />
      </template>
      <div v-else-if="!fetchingImages && results.length < 1" class="no_results">
        <p>No results found for "{{ searchInput }}"</p>
      </div>
      <PhotoCard
        v-for="image in results"
        :image-info="image"
        :key="image.id"
        v-else
        @view-image="previewImage"
      />
    </template>
    <div v-else class="network_error">
      <IconNetwork />
      <p>Please check your internet connection</p>
    </div>
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
