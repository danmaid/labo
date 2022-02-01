<template>
  <div v-if="detail">
    <address>
      <div>{{ detail.name }}</div>
      <div>〒{{ detail.postal_code }}</div>
      <div>{{ detail.region }}{{ detail.locality }}{{ detail.street_address }}</div>
    </address>
    <iframe
      :src="detail.map_url"
      width="600"
      height="450"
      style="border: 0"
      allowfullscreen="false"
      loading="lazy"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      detail: undefined as any,
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    async refresh() {
      this.detail = await this.$api.get(this.$route.path)
    },
  },
})
</script>
