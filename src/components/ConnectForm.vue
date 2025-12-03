<script>
import { CButton, CCol, CForm, CFormInput, CFormSelect, CRow } from '@coreui/vue'
import { GITHUB_PROVIDER, GITLAB_PROVIDER } from '@/constants'

export default {
  name: 'ConnectForm',
  GITHUB_PROVIDER,
  GITLAB_PROVIDER,
  components: {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CRow,
  },
  data() {
    return {
      token: '',
      provider: GITLAB_PROVIDER,
      project: '',
    }
  },
  computed: {
    providerPlaceholder() {
      if (this.provider === GITLAB_PROVIDER)
        return 'Full path of the project. For example, gitlab-org/gitlab-foss'
      if (this.provider === GITHUB_PROVIDER) return 'GitHub owner/repo'
      return 'Repository / Project'
    },
  },
  methods: {
    onSubmit() {
      this.$emit('analyze', {
        token: this.token,
        provider: this.provider,
        project: this.project,
      })
    },
  },
}
</script>

<template>
  <CForm @submit.prevent="onSubmit">
    <CRow class="justify-content-center">
      <CCol lg="6">
        <div class="d-flex flex-column">
          <CFormSelect v-model="provider" class="mb-3" label="Choose provider" required>
            <option :value="$options.GITLAB_PROVIDER">GitLab</option>
            <option :value="$options.GITHUB_PROVIDER">GitHub</option>
          </CFormSelect>

          <CFormInput
            v-model="project"
            class="mb-3"
            type="text"
            label="Enter project identifier"
            :placeholder="providerPlaceholder"
            required
          />

          <CFormInput
            v-model="token"
            class="mb-3"
            type="text"
            label="Enter API Token"
            placeholder="Your API token"
          />
          <CButton type="submit" color="primary">Analyze</CButton>
        </div>
      </CCol>
    </CRow>
  </CForm>
</template>

<style scoped></style>
