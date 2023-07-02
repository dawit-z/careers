<template>
  <div class="flex w-full flex-row flex-nowrap">
    <JobFilters />
    <JobListings />
  </div>
</template>

<script setup>
import JobFilters from "@/components/JobResults/JobFilters.vue";
import JobListings from "@/components/JobResults/JobListings.vue";
</script>
