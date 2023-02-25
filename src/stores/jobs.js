import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";

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
  },
});
