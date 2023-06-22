import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
vi.mock("axios");

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores job listings", () => {
    const jobStore = useJobsStore();
    expect(jobStore.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("fetchJobs", () => {
    it("makes API request and stores response", async () => {
      axios.get.mockResolvedValue({ data: ["Job 1", "Job 2"] });
      const store = useJobsStore();
      await store.fetchJobs();
      expect(store.jobs).toEqual(["Job 1", "Job 2"]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("uniqueOrganizations", () => {
    it("finds unique organizations from list of jobs", async () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: "Vue" },
        { organization: "Vue" },
        { organization: "Google" },
      ];

      expect(jobsStore.uniqueOrganizations).toEqual(new Set(["Vue", "Google"]));
    });
  });

  describe("filteredJobs", () => {
    it("finds jobs that are associated with given org's", async () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: "Vue" },
        { organization: "Amazon" },
        { organization: "Google" },
      ];

      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Vue", "Google"];

      const result = jobsStore.filteredJobsByOrganization;
      expect(result).toEqual([
        { organization: "Vue" },
        { organization: "Google" },
      ]);
    });

    describe("when user has not selected any organizations", () => {
      it("returns all jobs", () => {
        const jobsStore = useJobsStore();
        jobsStore.jobs = [
          { organization: "Vue" },
          { organization: "Amazon" },
          { organization: "Google" },
        ];

        const userStore = useUserStore();
        userStore.selectedOrganizations = [];

        const result = jobsStore.filteredJobsByOrganization;
        expect(result).toEqual(jobsStore.jobs);
      });
    });
  });
});
