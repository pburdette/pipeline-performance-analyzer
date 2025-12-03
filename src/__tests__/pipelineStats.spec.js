import { describe, it, expect } from 'vitest'
import {
  getSlowestJob,
  getLongestQueuedJob,
  getAvgPipelineDuration,
  getFailedJobsCount,
  getPipelineSuccessRate,
} from '@/utils/pipelineStats'
import { mockPipelines } from './mockData'

describe('Pipeline Stats Utils', () => {
  describe('getSlowestJob', () => {
    it('calculates the slowest job', () => {
      const result = getSlowestJob(mockPipelines)

      expect(result).toStrictEqual({
        duration: 890,
        name: 'memory_profiling',
        url: '/pburdette/ci-project/-/jobs/12035379864',
      })
    })
  })

  describe('getLongestQueuedJob', () => {
    it('calculate longest queued job', () => {
      const result = getLongestQueuedJob(mockPipelines)

      expect(result).toStrictEqual({
        queuedDuration: 240,
        name: 'memory_profiling',
        url: '/pburdette/ci-project/-/jobs/12035379864',
      })
    })
  })

  describe('getAvgPipelineDuration', () => {
    it('calculates average pipeline duration', () => {
      const result = getAvgPipelineDuration(mockPipelines)

      expect(result).toBe(516)
    })
  })

  describe('getFailedJobsCount', () => {
    it('calculates failed jobs count', () => {
      const result = getFailedJobsCount(mockPipelines)

      expect(result).toBe(4)
    })
  })

  describe('getPipelineSucessRate', () => {
    it('calculates pipeline success rate', () => {
      const result = getPipelineSuccessRate(mockPipelines)

      expect(result).toBe('33%')
    })
  })
})
