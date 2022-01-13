<template>
  <div class="home" style="position: relative">
    <Snow style="position: absolute; z-index: -1"></Snow>
    <div class="contents">
      <Memo></Memo>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
    Snow: defineAsyncComponent(() => import('./Snow.vue')),
    Memo: defineAsyncComponent(() => import('./Memo.vue')),
  },
})
</script>

<style>
.contents {
  background-color: rgba(100, 100, 255, 0.5);
  color: #fff;
  margin: 0 100px;
}
</style>
