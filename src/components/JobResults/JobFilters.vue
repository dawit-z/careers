<script setup lang="ts">
import { computed } from 'vue'
import ActionButton from '@/components/Shared/ActionButton.vue'
import JobFiltersGroup from '@/components/JobResults/JobFiltersGroup.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { useDegreesStore } from '@/stores/degrees'

const jobsStore = useJobsStore()
const uniqueOrganizations = computed(() => jobsStore.uniqueOrganizations)
const uniqueJobTypes = computed(() => jobsStore.uniqueJobTypes)

const degreesStore = useDegreesStore()
const uniqueDegrees = computed(() => degreesStore.uniqueDegrees)

const userStore = useUserStore()
</script>

<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">
          What do you want to do?
        </h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear Filters" type="secondary" />
        </div>
      </div>

      <JobFiltersGroup header="Degrees" :unique-values="uniqueDegrees" :action="userStore.addSelectedDegrees" />
      <JobFiltersGroup header="Job Types" :unique-values="uniqueJobTypes" :action="userStore.addSelectedJobTypes" />

      <JobFiltersGroup
        header="Organizations" :unique-values="uniqueOrganizations"
        :action="userStore.addSelectedOrganizations"
      />
    </section>
  </div>
</template>
