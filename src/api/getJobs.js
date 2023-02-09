import axios from 'axios';

async function getJobs() {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const response = await axios.get(`${baseUrl}/jobs`);
  return response.data;
}

export default getJobs;
