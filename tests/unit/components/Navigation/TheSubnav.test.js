import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import { useJobsStore } from "@/stores/jobs";

describe("TheSubnav", () => {
  const renderTheSubnav = (routeName) => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(TheSubnav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore };
  };

  describe("when user is on jobs page", () => {
    it("displays job count", async () => {
      const { jobsStore } = renderTheSubnav("JobResults");
      const numOfJobs = 16;
      jobsStore.filteredJobsByOrganization = Array(numOfJobs).fill({});

      const jobCount = await screen.findByText(numOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does NOT display job count", async () => {
      const { jobsStore } = renderTheSubnav("Home");
      const numOfJobs = 16;
      jobsStore.filteredJobsByOrganization = Array(numOfJobs).fill({});

      const jobCount = screen.queryByText(numOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
