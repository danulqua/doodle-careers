import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';

import JobListing from '@/components/job-results/JobListing.vue';

describe('JobListing', () => {
  function createJobProps(jobProps = {}) {
    return {
      title: 'Vue Developer',
      organization: 'AirBnB',
      locations: ['Kyiv'],
      minimumQualifications: ['Code'],
      ...jobProps,
    };
  }

  function renderJobListing(job) {
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
    const job = createJobProps({ title: 'Vue Developer' });
    renderJobListing(job);
    expect(screen.getByText('Vue Developer')).toBeInTheDocument();
  });

  it('renders job organization', () => {
    const job = createJobProps({ organization: 'Microsoft' });
    renderJobListing(job);
    expect(screen.getByText('Microsoft')).toBeInTheDocument();
  });

  it('renders job locations', () => {
    const job = createJobProps({ locations: ['Kyiv', 'Lviv'] });
    renderJobListing(job);
    expect(screen.getByText('Kyiv')).toBeInTheDocument();
    expect(screen.getByText('Lviv')).toBeInTheDocument();
  });

  it('renders job qualifications', () => {
    const job = createJobProps({
      minimumQualifications: ['Code', 'Architecture'],
    });
    renderJobListing(job);
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Architecture')).toBeInTheDocument();
  });
});
