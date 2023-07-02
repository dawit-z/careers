import { render, screen, fireEvent } from "@testing-library/vue";

import { useRouter } from "vue-router";
vi.mock("vue-router");

import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";

describe("JobSearchForm", () => {
  describe("when user submits form", () => {
    it("directs user to job results page with user's search parameters", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });

      render(JobSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = screen.getByRole("textbox", { name: "Role" });
      await fireEvent.update(roleInput, "Vue Developer");

      const locationInput = screen.getByRole("textbox", { name: "Where?" });
      await fireEvent.update(locationInput, "Dallas");

      const submitButton = screen.getByRole("button", { name: "Search" });
      await fireEvent.click(submitButton);

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: { role: "Vue Developer", location: "Dallas" },
      });
    });
  });
});
