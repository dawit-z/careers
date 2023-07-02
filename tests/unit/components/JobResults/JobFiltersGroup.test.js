import { render, screen, fireEvent } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { useRouter } from "vue-router";
vi.mock("vue-router");
import JobFiltersGroup from "@/components/JobResults/JobFiltersGroup.vue";

describe("JobFiltersOrganization", () => {
  const createProps = (props = {}) => ({
    header: "Some header",
    uniqueValues: new Set(["ValueA", "ValueB"]),
    action: vi.fn(),
    ...props,
  });

  const renderSidebar = (props) => {
    const pinia = createTestingPinia();

    render(JobFiltersGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
        stubs: { FontAwesomeIcon: true },
      },
    });
  };

  it("renders unique list of values", async () => {
    const props = createProps({
      header: "Job Types",
      uniqueValues: new Set(["Full-time", "Part-time"]),
    });
    renderSidebar(props);

    const button = screen.getByRole("button", { name: /job types/i });
    await fireEvent.click(button);

    const orgListItems = screen.getAllByRole("listitem");
    const orgs = orgListItems.map((node) => node.textContent);
    expect(orgs).toEqual(["Google", "Apple"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      useRouter.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Full-time", "Part-time"]),
        action,
      });
      renderSidebar(props);

      const button = screen.getByRole("button", { name: /job types/i });
      await fireEvent.click(button);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await fireEvent.click(fullTimeCheckbox);

      expect(action).toHaveBeenCalledWith(["Full-time"]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });
      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Full-time"]),
      });
      renderSidebar(props);

      const button = screen.getByRole("button", { name: /job types/i });
      await fireEvent.click(button);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await fireEvent.click(fullTimeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
