import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersOrganizations from "@/components/JobResults/JobFiltersOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";

describe("JobFiltersOrganization", () => {
  it("renders unique list of orgs from jobs", async () => {
    const pinia = createTestingPinia();
    const store = useJobsStore();
    store.uniqueOrganizations = new Set(["Google", "Apple"]);

    render(JobFiltersOrganizations, {
      global: {
        plugins: [pinia],
        stubs: { FontAwesomeIcon: true },
      },
    });

    const button = screen.getByRole("button", { name: "Organizations" });
    await userEvent.click(button);

    const orgListItems = screen.getAllByRole("listitem");
    const orgs = orgListItems.map((org) => org.textContent);

    expect(orgs).toEqual(["Google", "Apple"]);
  });
});
