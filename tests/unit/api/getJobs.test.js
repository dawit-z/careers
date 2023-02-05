import axios from "axios";
vi.mock("axios");

import getJobs from "@/api/getJobs";

describe("getJobs", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [{ id: 1, title: "Vue Developer" }] });
  });

  it("fetches and extracts jobs from response", async () => {
    const jobs = await getJobs();

    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
    expect(jobs).toEqual([{ id: 1, title: "Vue Developer" }]);
  });
});
