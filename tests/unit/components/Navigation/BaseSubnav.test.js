import { render, screen } from "@testing-library/vue";

import BaseSubnav from "@/components/Navigation/BaseSubnav.vue";

describe("BaseSubnav", () => {
  const renderTheSubNav = (routeName) => {
    render(BaseSubnav, {
      global: {
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
  };

  describe("when user is on jobs page", () => {
    it("displays job count", () => {
      renderTheSubNav("JobResults");
      const jobCount = screen.getByText("1653");
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does NOT display job count", () => {
      renderTheSubNav("Home");
      const jobCount = screen.queryByText("1653");
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
