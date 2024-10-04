<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import PhotoCard from '@/components/PhotoCard.vue'
import { ref } from 'vue'

const searchInput = ref('')

const results = [
  {
    title: 'Golden Gate Bridge',
    location: 'San Francisco, California, USA',
    url: 'https://placeholder.com/300x200'
  },
  {
    title: 'Eiffel Tower',
    location: 'Paris, France',
    url: 'https://placeholder.com/300x200'
  },
  {
    title: 'Taj Mahal',
    location: 'Agra, India',
    url: 'https://placeholder.com/300x200'
  },
  {
    title: 'Great Wall of China',
    location: 'China',
    url: 'https://placeholder.com/300x200'
  },
  {
    title: 'Chichen Itza',
    location: 'Mexico',
    url: 'https://placeholder.com/300x200'
  },
  {
    title: 'Machu Picchu',
    location: 'Peru',
    url: 'https://placeholder.com/300x200'
  }
]
</script>

<template>
  <div class="search-box">
    <div class="search-input">
      <IconSearch />
      <input type="search" placeholder="Search for photo" v-model="searchInput" />
    </div>
  </div>
  <section class="image-section">
    <PhotoCard :loading="true" v-for="image in results" :image-info="image" :key="image.title" />
  </section>
</template>
