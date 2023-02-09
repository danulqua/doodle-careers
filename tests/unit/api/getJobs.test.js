import axios from 'axios';

import getJobs from '@/api/getJobs';

vi.mock('axios');
const baseUrl = import.meta.env.VITE_APP_API_URL;

describe('getJobs', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'JavaScript Engineer',
        },
      ],
    });
  });

  it('fetches jobs that candidates can apply to', async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/jobs`);
  });

  it('extracts jobs from responce', async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([
      {
        id: 1,
        title: 'JavaScript Engineer',
      },
    ]);
  });
});
