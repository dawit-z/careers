import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_API_URL;

const getJobs = async () => {
  const url = `${baseUrl}/jobs`;
  const response = await axios.get(url);
  return response.data;
};

export default getJobs;
