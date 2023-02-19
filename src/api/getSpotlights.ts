import axios from 'axios';

import type { Spotlight } from './types';

async function getSpotlights() {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const response = await axios.get<Spotlight[]>(`${baseUrl}/spotlights`);
  return response.data;
}

export default getSpotlights;
