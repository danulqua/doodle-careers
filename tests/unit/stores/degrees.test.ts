import type { Mock } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';

import { useDegreesStore } from '@/stores/degrees';
import { createDegree } from 'tests/utils/createDegree';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('stores all degrees that jobs may require', () => {
    const store = useDegreesStore();
    expect(store.degrees).toEqual([]);
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('FETCH_DEGREES', () => {
    it('makes API request and stores received degrees', async () => {
      axiosGetMock.mockResolvedValue({ data: ['degree 1', 'degree 2'] });

      const store = useDegreesStore();
      await store.FETCH_DEGREES();

      expect(store.degrees).toEqual(['degree 1', 'degree 2']);
    });
  });
});

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('UNIQUE_DEGREES', () => {
    it('finds unique degrees from collection of degrees', () => {
      const store = useDegreesStore();
      store.degrees = [
        createDegree({ degree: "Bachelor's" }),
        createDegree({ degree: "Master's" }),
      ];

      const result = store.UNIQUE_DEGREES;

      expect(result).toEqual(new Set(["Master's", "Bachelor's"]));
    });
  });
});
