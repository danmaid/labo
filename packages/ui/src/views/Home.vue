<template>
  <div class="home" style="position: relative">
    <Snow style="position: absolute; z-index: -1"></Snow>
    <div class="contents">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
    Snow: defineAsyncComponent(() => import('./Snow.vue')),
  },
})
</script>

<style>
.contents {
  background-color: rgba(100, 100, 255, 0.5);
  margin: 0 100px;
}
</style>
