import axios from "axios";
import type { Job } from "./types";

async function getJobs() {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/jobs`;
  const response = await axios.get<Job[]>(url);
  return response.data;
}

export default getJobs;
