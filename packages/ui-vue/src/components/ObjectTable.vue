<script setup lang="ts">
defineProps<{ items: Record<string, unknown>[] }>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="key of keys">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item of items">
        <td v-for="key of keys">{{ item[key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    keys(): string[] {
      return [...new Set(this.items.flatMap((v) => Object.keys(v)))]
    },
  },
})
</script>
