export const getSlowestJob = (pipelines) => {
  if (!pipelines.length) return null

  // Collect all jobs from all pipelines into an Array
  const allJobs = pipelines.flatMap((p) => p.jobs?.nodes || [])

  // Filter out jobs without duration
  const jobsWithDuration = allJobs.filter((job) => job.duration !== null)

  // Find the slowest job
  const slowestJob = jobsWithDuration.reduce((slowest, job) =>
    job.duration > slowest.duration ? job : slowest,
  )

  return {
    name: slowestJob.name,
    duration: slowestJob.duration,
    url: slowestJob.webPath,
  }
}

export const getLongestQueuedJob = (pipelines) => {
  if (!pipelines.length) return null

  // Collect all jobs from all pipelines into an Array
  const allJobs = pipelines.flatMap((p) => p.jobs?.nodes || [])

  // Filter out jobs without queuedDuration
  const jobsWithQueueTime = allJobs.filter((job) => job.queuedDuration !== null)

  if (!jobsWithQueueTime.length) return null

  // Find the job with longest queue time
  const longestQueuedJob = jobsWithQueueTime.reduce((longest, job) =>
    job.queuedDuration > longest.queuedDuration ? job : longest,
  )

  return {
    name: longestQueuedJob.name,
    queuedDuration: Math.round(longestQueuedJob.queuedDuration),
    url: longestQueuedJob.webPath,
  }
}

export const getAvgPipelineDuration = (pipelines) => {
  if (!pipelines.length) return 0

  const total = pipelines.reduce((sum, p) => sum + (p.duration || 0), 0)

  return Math.round(total / pipelines.length)
}

export const getPipelineSuccessRate = (pipelines) => {
  if (!pipelines.length) return 0

  // Filter out all successful pipelines
  const successfulPipelines = pipelines.filter((p) => p.status === 'SUCCESS').length

  const sucessRate = Math.round((successfulPipelines / pipelines.length) * 100)

  return `${sucessRate}%`
}

export const getFailedJobsCount = (pipelines) => {
  if (!pipelines.length) return 0

  // Collect all jobs from all pipelines into an Array
  const allJobs = pipelines.flatMap((p) => p.jobs?.nodes || [])

  // Filter out any jobs with a status of FAILED
  const failedJobs = allJobs.filter((job) => {
    return job.status === 'FAILED'
  })

  return failedJobs.length || 0
}
