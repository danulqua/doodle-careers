import type { Mock } from 'vitest';
import axios from 'axios';

import getSpotlights from '@/api/getSpotlights';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;
const baseUrl = import.meta.env.VITE_APP_API_URL;

describe('getSpotlights', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Cloud Engineering',
        },
      ],
    });
  });

  it('fetches spotlights', async () => {
    await getSpotlights();
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/spotlights`);
  });

  it('extracts spotlights from response', async () => {
    const spotlights = await getSpotlights();
    expect(spotlights).toEqual([
      {
        id: 1,
        title: 'Cloud Engineering',
      },
    ]);
  });
});
