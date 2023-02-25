import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
vi.mock("axios");
import { useJobsStore } from "@/stores/jobs";

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

  describe("getUniqueOrganizations", () => {
    it("finds unique organizations from list of jobs", async () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Vue" },
        { organization: "Vue" },
        { organization: "Google" },
      ];

      expect(store.uniqueOrganizations).toEqual(new Set(["Vue", "Google"]));
    });
  });
});
