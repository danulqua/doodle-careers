import axios from 'axios';

import getJobs from '@/api/getJobs';

vi.mock('axios');
const baseUrl = import.meta.env.VITE_APP_API_URL;

describe('getJobs', () => {
  it('fetches jobs that candidates can apply to', async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/jobs`);
  });
});
