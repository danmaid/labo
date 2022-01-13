<template>
  <div class="viewport" @click="drop">
    <Snow :stream="stream"></Snow>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { Stream } from '@/Stream'

export default defineComponent({
  components: {
    Snow: defineAsyncComponent(() => import('@/components/Snow.vue')),
  },
  data() {
    return {
      stream: new Stream(),
      ws: undefined as WebSocket | undefined,
    }
  },
  mounted() {
    this.ws = new WebSocket('wss://api.labo.danmaid.com')
    this.ws.addEventListener('message', this.drop)
  },
  unmounted() {
    if (this.ws) {
      this.ws.removeEventListener('message', this.drop)
      this.ws.close()
    }
  },
  methods: {
    drop(ev: Event) {
      this.stream.push(ev)
    },
  },
})
</script>

<style>
.viewport {
  background-color: #000;
  width: 100%;
  height: 80vh;
}
</style>
