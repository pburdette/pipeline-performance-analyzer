<script>
import { CButton, CCol, CForm, CFormInput, CRow } from '@coreui/vue'
import { TOKEN_KEY, PROJECT_KEY } from '@/constants'

export default {
  name: 'ConnectForm',
  components: {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CRow,
  },
  data() {
    return {
      token: '',
      project: '',
    }
  },
  methods: {
    onSubmit() {
      localStorage.setItem(TOKEN_KEY, this.token)
      localStorage.setItem(PROJECT_KEY, this.project)

      this.$emit('analyze', {
        token: this.token,
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
          <CFormInput
            v-model="project"
            class="mb-3"
            type="text"
            label="Enter project full path"
            placeholder="Your project full path"
            required
          />

          <CFormInput
            v-model="token"
            type="password"
            label="Enter API Token"
            placeholder="Your API token"
            text="Stored locally in your browser. Never sent to any server."
            required
          />

          <CButton type="submit" color="primary" class="mt-3">
            <CIcon icon="cilMediaPlay" class="me-2" /> Analyze Pipelines
          </CButton>
        </div>
      </CCol>
    </CRow>
  </CForm>
</template>

<style scoped></style>
