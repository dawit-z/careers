import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "Stripe",
    locations: ["Dayton"],
    minimumQualifications: ["Diploma"],
    ...jobProps,
  });

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: { stubs: { "router-link": RouterLinkStub } },
      props: { job: { ...jobProps } },
    });
  };

  it("renders job title", () => {
    const jobProps = createJobProps({ title: "React Programmer" });
    renderJobListing(jobProps);
    expect(screen.getByText("React Programmer")).toBeInTheDocument();
  });

  it("renders job organization", () => {
    const jobProps = createJobProps({ organization: "Microsoft" });
    renderJobListing(jobProps);
    expect(screen.getByText("Microsoft")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const jobProps = createJobProps({ locations: ["Miami", "Orlando"] });
    renderJobListing(jobProps);
    expect(screen.getByText("Miami")).toBeInTheDocument();
    expect(screen.getByText("Orlando")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Code", "Develop"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Develop")).toBeInTheDocument();
  });
});
