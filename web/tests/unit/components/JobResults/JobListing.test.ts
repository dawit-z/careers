import { RouterLinkStub, mount } from '@vue/test-utils'
import { expect } from 'vitest'
import { createJob } from '../../../utils/createJob'
import JobListing from '@/components/JobResults/JobListing.vue'
import type { Job } from '@/api/types'

describe('jobListing', () => {
  function mountJobListing(job: Job) {
    return mount(JobListing, {
      global: { stubs: { 'router-link': RouterLinkStub } },
      props: { job: { ...job } },
    })
  }

  it('renders job title', () => {
    const job = createJob({ title: 'React Programmer' })

    const wrapper = mountJobListing(job)
    expect(wrapper.text()).toContain('React Programmer')
  })

  it('renders job organization', () => {
    const job = createJob({ organization: 'Microsoft' })

    const wrapper = mountJobListing(job)
    expect(wrapper.text()).toContain('Microsoft')
  })

  it('renders job locations', () => {
    const job = createJob({ locations: ['Miami', 'Orlando'] })
    const wrapper = mountJobListing(job)

    expect(wrapper.text()).toContain('Miami')
    expect(wrapper.text()).toContain('Orlando')
  })

  it('renders job qualifications', () => {
    const job = createJob({
      minimumQualifications: ['Code', 'Develop'],
    })
    const wrapper = mountJobListing(job)

    expect(wrapper.text()).toContain('Code')
    expect(wrapper.text()).toContain('Develop')
  })
})
