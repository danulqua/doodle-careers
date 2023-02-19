import axios from 'axios';

import type { Job } from '@/api/types';

async function getJobs() {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const response = await axios.get<Job[]>(`${baseUrl}/jobs`);
  return response.data;
}

export default getJobs;
