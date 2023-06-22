import { render, screen, fireEvent } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersOrganizations from "@/components/JobResults/JobFiltersOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

describe("JobFiltersOrganization", () => {
  const renderSidebar = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();

    render(JobFiltersOrganizations, {
      global: {
        plugins: [pinia],
        stubs: { FontAwesomeIcon: true },
      },
    });

    return { jobsStore, userStore };
  };

  it("renders unique list of organizations from jobs", async () => {
    const { jobsStore } = renderSidebar();
    jobsStore.uniqueOrganizations = new Set(["Google", "Apple"]);

    const button = screen.getByRole("button", { name: "Organizations" });
    await fireEvent.click(button);

    const orgListItems = screen.getAllByRole("listitem");
    const orgs = orgListItems.map((org) => org.textContent);

    expect(orgs).toEqual(["Google", "Apple"]);
  });

  it("communicates user has selected checkbox for organization", async () => {
    const { jobsStore, userStore } = renderSidebar();
    jobsStore.uniqueOrganizations = new Set(["Google", "Apple"]);

    const button = screen.getByRole("button", { name: "Organizations" });
    await fireEvent.click(button);

    const googleCheckbox = screen.getByRole("checkbox", {
      name: /google/i,
    });
    await fireEvent.click(googleCheckbox);

    expect(userStore.addSelectedOrganization).toHaveBeenCalledWith(["Google"]);
  });
});
