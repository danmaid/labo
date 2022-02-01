<template>
  <div v-if="detail">
    <div>{{ detail.name }}</div>
    <address v-if="address">
      <div>〒{{ address.postal_code }}</div>
      <div>{{ address.region }}{{ address.locality }}{{ address.street_address }}</div>
    </address>
    <div v-if="'phone_number' in detail">
      TEL: <a :href="`tel://${detail.phone_number}`">{{ detail.phone_number }}</a>
    </div>
    <iframe
      v-if="address && 'map_url' in address"
      :src="address.map_url"
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
      address: undefined as any,
    }
  },
  mounted() {
    this.refresh()
  },
  watch: {
    detail(v) {
      if ('address' in v) this.getAddress(v.address)
    },
  },
  methods: {
    async refresh() {
      this.detail = await this.$api.get(this.$route.path)
    },
    async getAddress(id: string) {
      this.address = await this.$api.get(`/address/${id}`)
    },
  },
})
</script>
