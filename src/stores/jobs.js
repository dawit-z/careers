import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";
import { useUserStore } from "@/stores/user";

export const useJobsStore = defineStore("jobs", {
  state: () => ({
    jobs: [],
  }),
  actions: {
    async fetchJobs() {
      const jobs = await getJobs();
      this.jobs = jobs;
    },
  },
  getters: {
    uniqueOrganizations(state) {
      const uniqueOrganizations = new Set();
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
      return uniqueOrganizations;
    },
    uniqueJobTypes(state) {
      const uniqueJobTypes = new Set();
      state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
      return uniqueJobTypes;
    },
    includeJobByOrganization: () => (job) => {
      const userStore = useUserStore();
      if (userStore.selectedOrganizations.length === 0) return true;
      return userStore.selectedOrganizations.includes(job.organization);
    },
    includeJobByJobType: () => (job) => {
      const userStore = useUserStore();
      if (userStore.selectedJobTypes.length === 0) return true;
      return userStore.selectedJobTypes.includes(job.jobType);
    },
    filteredJobs(state) {
      return state.jobs
        .filter((job) => this.includeJobByOrganization(job))
        .filter((job) => this.includeJobByJobType(job));
    },
  },
});
