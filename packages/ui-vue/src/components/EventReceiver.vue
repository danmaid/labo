<template>
  <slot :events="events">
    <div>
      <div v-for="event of events">{{ event }}</div>
    </div>
  </slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      ws: undefined as WebSocket | undefined,
      events: [] as any[],
    }
  },
  mounted() {
    const ws = new WebSocket('ws://localhost:6900')
    ws.addEventListener('message', (ev) => this.events.push(JSON.parse(ev.data)))
    this.ws = ws
  },
  beforeUnmount() {
    this.ws?.close()
  },
})
</script>
