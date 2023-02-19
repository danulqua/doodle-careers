import type { Mock } from 'vitest';
import axios from 'axios';

import getDegrees from '@/api/getDegrees';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;
const baseUrl = import.meta.env.VITE_APP_API_URL;

describe('getDegrees', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          degree: 'Bachelor',
        },
      ],
    });
  });

  it('fetches degrees', async () => {
    await getDegrees();
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/degrees`);
  });

  it('extracts degrees from response', async () => {
    const degrees = await getDegrees();
    expect(degrees).toEqual([
      {
        id: 1,
        degree: 'Bachelor',
      },
    ]);
  });
});
