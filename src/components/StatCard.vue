<script>
export default {
  name: 'StatCard',
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
    name: { type: String, required: false },
    url: { type: String, required: false },
    suffix: { type: String, required: false },
    icon: { type: String, required: false },
  },
  computed: {
    completeUrl() {
      return `https://gitlab.com${this.url}`
    },
  },
}
</script>

<template>
  <div
    class="p-3 border rounded shadow-sm d-flex flex-column justify-content-center align-items-center text-center"
  >
    <CIcon :icon="icon" size="xxl" class="mb-2 text-primary" />

    <h5>{{ title }}</h5>

    <p>
      <a v-if="name && url" :href="completeUrl" target="_blank">{{ name }}</a> {{ value }}
      <span v-if="suffix">{{ suffix }}</span>
    </p>
  </div>
</template>

<style scoped></style>
