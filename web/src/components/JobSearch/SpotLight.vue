<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Spotlight } from '@/api/types'
import { getSpotlights } from '@/api'

const spotlights = ref<Spotlight[]>([])

onMounted(async () => {
  spotlights.value = await getSpotlights()
})
</script>

<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot :img="spotlight.img" :title="spotlight.title" :description="spotlight.description" />
    </li>
  </ul>
</template>
