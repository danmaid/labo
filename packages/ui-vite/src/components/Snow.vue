<template>
  <div ref="root" class="viewport"></div>
</template>

<script lang="ts">
import { Stream } from '@/Stream'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    stream: { type: Object as PropType<Stream> },
  },
  data() {
    return {
      snows: [] as number[],
    }
  },
  mounted() {
    this.stream?.on('data', this.drop)
  },
  unmounted() {
    this.stream?.off('data', this.drop)
  },
  methods: {
    async drop() {
      const snow = document.createElement('div')
      snow.classList.add('snow')
      snow.style.left = Math.floor(Math.random() * 100) + '%'
      const root = this.$refs.root as HTMLElement
      root.appendChild(snow)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      root.removeChild(snow)
    },
  },
})
</script>

<style scoped>
.viewport {
  overflow: hidden;
  position: relative;
}
</style>

<style>
.snow {
  background-color: #fff;
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  animation: drop 3s linear forwards;
}

@keyframes drop {
  from {
    top: 0%;
  }
  to {
    top: 100%;
  }
}
</style>
