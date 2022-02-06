<template>
  <h1>labo</h1>
  <SubmitMemo></SubmitMemo>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SubmitMemo from './components/SubmitMemo.vue'

export default defineComponent({
  components: { SubmitMemo },
  mounted() {
    const ws = new WebSocket('ws://localhost:6900')
    ws.addEventListener('message', (ev) => {
      console.log(ev.data)
    })
  },
})
</script>
