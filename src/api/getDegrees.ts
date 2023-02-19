import axios from 'axios';

import type { Degree } from '@/api/types';

async function getDegrees() {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const response = await axios.get<Degree[]>(`${baseUrl}/degrees`);
  return response.data;
}

export default getDegrees;
