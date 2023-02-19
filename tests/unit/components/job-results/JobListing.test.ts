import type { Job } from '@/api/types';
import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';

import JobListing from '@/components/job-results/JobListing.vue';
import { createJob } from 'tests/utils/createJob';

describe('JobListing', () => {
  function renderJobListing(job: Job) {
    render(JobListing, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: { job },
    });
  }

  it('renders job title', () => {
    const job = createJob({ title: 'Vue Developer' });
    renderJobListing(job);
    expect(screen.getByText('Vue Developer')).toBeInTheDocument();
  });

  it('renders job organization', () => {
    const job = createJob({ organization: 'Microsoft' });
    renderJobListing(job);
    expect(screen.getByText('Microsoft')).toBeInTheDocument();
  });

  it('renders job locations', () => {
    const job = createJob({ locations: ['Kyiv', 'Lviv'] });
    renderJobListing(job);
    expect(screen.getByText('Kyiv')).toBeInTheDocument();
    expect(screen.getByText('Lviv')).toBeInTheDocument();
  });

  it('renders job qualifications', () => {
    const job = createJob({
      minimumQualifications: ['Code', 'Architecture'],
    });
    renderJobListing(job);
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Architecture')).toBeInTheDocument();
  });
});
