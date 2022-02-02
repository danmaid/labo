<template>
  <h1>labo</h1>
  <button @click="click">click</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  mounted() {
    const ws = new WebSocket('ws://localhost:6900')
    ws.addEventListener('message', (ev) => {
      console.log(ev.data)
    })
  },
  methods: {
    click() {
      fetch('http://localhost:6900/hoge/fuga')
    },
  },
})
</script>
