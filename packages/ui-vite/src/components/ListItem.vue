<template>
  <li>
    <span>{{ item }}</span>
    <button @click="$emit('edit', item)">edit</button>
    <button @click="$emit('delete', item)">delete</button>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    item: { type: String }
  },
  emits: ['delete', 'edit']
})
</script>
