<script>
import { CButton, CContainer, CCol, CSpinner, CRow } from '@coreui/vue'
import ConnectForm from '@/components/ConnectForm.vue'
import PipelineDurationChart from '@/components/PipelineDurationChart.vue'
import StatCard from '@/components/StatCard.vue'
import { TOKEN_KEY, PROJECT_KEY } from '@/constants'
import { gitlabClient } from '@/services/gitlabClient'
import getPipelines from '@/graphql/queries/getPipelines.graphql'
import {
  getSlowestJob,
  getLongestQueuedJob,
  getAvgPipelineDuration,
  getFailedJobsCount,
  getPipelineSuccessRate,
} from '@/utils/pipelineStats'

export default {
  name: 'HomeView',
  components: {
    CButton,
    CContainer,
    ConnectForm,
    CCol,
    CSpinner,
    CRow,
    PipelineDurationChart,
    StatCard,
  },
  data() {
    return {
      pipelines: [],
      isConfigured: false,
      isLoading: false,
    }
  },
  mounted() {
    const token = localStorage.getItem(TOKEN_KEY)
    const project = localStorage.getItem(PROJECT_KEY)

    if (token && project) {
      this.isConfigured = true

      this.analyzePipelines({
        token,
        project,
      })
    }
  },
  computed: {
    showStats() {
      return !this.isLoading && this.pipelines.length > 0
    },
    slowestJob() {
      return getSlowestJob(this.pipelines)
    },
    longestQueuedJob() {
      return getLongestQueuedJob(this.pipelines)
    },
    avgDuration() {
      return getAvgPipelineDuration(this.pipelines)
    },
    failedJobsCount() {
      return getFailedJobsCount(this.pipelines)
    },
    pipelineSuccessRate() {
      return getPipelineSuccessRate(this.pipelines)
    },
  },
  methods: {
    async analyzePipelines({ token, project }) {
      this.isConfigured = true
      this.isLoading = true

      const client = gitlabClient(token)

      try {
        const data = await client.request(getPipelines, {
          fullPath: project,
        })

        this.pipelines = data.project.pipelines.nodes
      } catch (err) {
        console.error('GraphQL error:', err)
      } finally {
        this.isLoading = false
      }
    },
    disconnect() {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(PROJECT_KEY)

      this.isConfigured = false
      this.pipelines = []
    },
  },
}
</script>

<template>
  <CContainer class="mt-5">
    <CRow class="justify-content-center text-center">
      <CCol lg="8">
        <h1 class="mb-3">Pipeline Performance Analyzer</h1>
        <p>Analyze the performance of your last <b>20 finished GitLab pipelines</b></p>
        <p class="mb-4">
          <a
            href="https://github.com/pburdette/pipeline-performance-analyzer"
            target="_blank"
            rel="noopener"
          >
            Contribute or report issues
          </a>
        </p>
        <CButton v-if="showStats" color="secondary" @click="disconnect">
          <CIcon icon="cilExitToApp" class="me-2" /> Disconnect
        </CButton>
      </CCol>
    </CRow>

    <ConnectForm v-if="!isConfigured" class="mt-4" @analyze="analyzePipelines" />

    <CRow v-if="isLoading" class="justify-content-center my-5">
      <CCol class="text-center">
        <CSpinner />
      </CCol>
    </CRow>

    <div v-if="showStats">
      <CRow class="mt-5">
        <CCol md="12">
          <h2 class="text-start">Key Metrics</h2>
          <hr class="mb-4" />
        </CCol>
      </CRow>
      <CRow class="mt-1 mb-2 text-center">
        <CCol md="6">
          <StatCard
            title="Failed jobs count"
            :value="failedJobsCount"
            suffix="failed jobs"
            icon="cilXCircle"
          />
        </CCol>
        <CCol md="6">
          <StatCard
            title="Pipeline success rate"
            :value="pipelineSuccessRate"
            suffix="success rate"
            icon="cilCheckCircle"
          />
        </CCol>
      </CRow>

      <CRow class="mt-5 mb-4 text-center">
        <CCol md="4">
          <StatCard
            title="Slowest Job"
            :name="slowestJob.name"
            :value="slowestJob.duration"
            :url="slowestJob.url"
            suffix="seconds"
            icon="cilAvTimer"
          />
        </CCol>
        <CCol md="4">
          <StatCard
            title="Longest Queued Job"
            :name="longestQueuedJob.name"
            :value="longestQueuedJob.queuedDuration"
            :url="longestQueuedJob.url"
            suffix="seconds"
            icon="cilClock"
          />
        </CCol>
        <CCol md="4">
          <StatCard
            title="Avg Pipeline Duration"
            :value="avgDuration"
            suffix="seconds"
            icon="cilChartLine"
          />
        </CCol>
      </CRow>
    </div>

    <div v-show="showStats">
      <CRow class="mt-5">
        <CCol md="12">
          <h2 class="text-start">Pipeline Duration Trend</h2>
          <hr class="mb-4" />
        </CCol>
      </CRow>
      <CRow class="justify-content-center text-center mb-5">
        <CCol>
          <PipelineDurationChart :pipelines="pipelines" class="mt-2" />
        </CCol>
      </CRow>
    </div>
  </CContainer>
</template>

<style scoped></style>
