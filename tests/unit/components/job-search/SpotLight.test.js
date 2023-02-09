import { render, screen } from '@testing-library/vue';
import axios from 'axios';

import SpotLight from '@/components/job-search/SpotLight.vue';

vi.mock('axios');

describe('SpotLight', () => {
  function mockSpotlightsResponse(spotlight = {}) {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: 'Some image',
          title: 'Some title',
          description: 'Some description',
          ...spotlight,
        },
      ],
    });
  }

  it('provides image to parent component', async () => {
    const spotlight = { img: 'Image' };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.img }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText('Image');
    expect(text).toBeInTheDocument();
  });

  it('provides title to parent component', async () => {
    const spotlight = { title: 'Title' };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.title }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText('Title');
    expect(text).toBeInTheDocument();
  });

  it('provides description to parent component', async () => {
    const spotlight = { description: 'Description' };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.description }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText('Description');
    expect(text).toBeInTheDocument();
  });
});
