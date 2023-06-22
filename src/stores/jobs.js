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
    filteredJobsByOrganization(state) {
      const userStore = useUserStore();

      if (!userStore.selectedOrganizations.length) return state.jobs;

      return state.jobs.filter((job) =>
        userStore.selectedOrganizations.includes(job.organization)
      );
    },
  },
});
