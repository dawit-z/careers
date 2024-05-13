<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import JobListing from '@/components/JobResults/JobListing.vue'
import { useJobsStore } from '@/stores/jobs'
import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'
import { useDegreesStore } from '@/stores/degrees'

const jobsStore = useJobsStore()
const degreesStore = useDegreesStore()
const route = useRoute()

onMounted(jobsStore.fetchJobs)
onMounted(degreesStore.fetchDegrees)

const filteredJobs = computed(() => jobsStore.filteredJobs)
const maxPage = computed(() => Math.ceil(filteredJobs.value.length / 10))

const currentPage = computed(
  () => Number.parseInt((route.query.page as string) || '1'),
)

const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage,
)

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value
  const firstJobIndex = (pageNumber - 1) * 10
  const lastJobIndex = pageNumber * 10
  return filteredJobs.value.slice(firstJobIndex, lastJobIndex)
})
</script>

<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <JobListing v-for="job in displayedJobs" :key="job.id" :job="job" />

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">
          Page {{ currentPage }}
        </p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage" :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1" role="link"
          >
            Previous
          </router-link>

          <router-link
            v-if="nextPage" :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1" role="link"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
