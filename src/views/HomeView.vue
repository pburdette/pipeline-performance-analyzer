<script>
import { CContainer, CCol, CRow } from '@coreui/vue'
import ConnectForm from '@/components/ConnectForm.vue'
import { GITHUB_PROVIDER, GITLAB_PROVIDER } from '@/constants'

export default {
  name: 'HomeView',
  components: {
    CContainer,
    ConnectForm,
    CCol,
    CRow,
  },
  data() {
    return {
      pipelines: [],
    }
  },
  methods: {
    analyzeHanlder(connectionData) {
      const { provider } = connectionData

      if (provider === GITLAB_PROVIDER) {
        console.log(connectionData)
      }

      if (provider === GITHUB_PROVIDER) {
        console.log(connectionData)
      }
    },
  },
}
</script>

<template>
  <CContainer class="mt-5">
    <CRow class="justify-content-center text-center">
      <CCol lg="8">
        <h1 class="mb-3">Pipeline Performance Analyzer</h1>
        <p>Analyze the performance of your GitLab or GitHub pipelines.</p>
        <p class="mb-0">
          <a href="https://github.com/yourusername/your-repo" target="_blank" rel="noopener">
            Contribute or report issues
          </a>
        </p>
      </CCol>
    </CRow>

    <ConnectForm class="mt-5" @analyze="analyzeHanlder" />
  </CContainer>
</template>

<style scoped></style>
