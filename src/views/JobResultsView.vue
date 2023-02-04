<template>
  <div class="flex w-full flex-row flex-nowrap">
    <JobFilters />
    <JobListings />
  </div>
</template>

<script>
import JobFilters from "@/components/JobResults/JobFilters.vue";
import JobListings from "@/components/JobResults/JobListings.vue";

export default {
  name: "JobResultsView",
  components: { JobFilters, JobListings },
  methods: {
    goToHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
