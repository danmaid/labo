<template>
  <form @submit.prevent="submit" @reset.prevent="reset">
    <textarea v-model="memo"></textarea>
    <input type="submit" />
    <input type="reset" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      memo: ''
    }
  },
  computed: {
    payload(): { memo: string } { return { memo: this.memo } }
  },
  methods: {
    async submit() {
      const headers = { 'Content-Type': 'application/json' }
      const body = JSON.stringify(this.payload)
      await fetch('http://localhost:6900', { method: 'POST', headers, body })
      this.reset()
    },
    reset() {
      this.memo = ''
    }
  }
})
</script>