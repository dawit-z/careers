<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useJobsStore } from '@/stores/jobs'

const jobsStore = useJobsStore()
const route = useRoute()

const onJobResultsPage = computed(() => route.name === 'JobResults')
</script>

<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <Icon icon="ic:round-search" class="mr-3" />
        <span><span class="text-brand-green-1">{{ jobsStore.filteredJobs.length }}</span>
          jobs matched</span>
      </div>
    </div>
  </div>
</template>
