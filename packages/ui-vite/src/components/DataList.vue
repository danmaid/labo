<template>
  <div>
    <button @click="refresh">refresh</button>
    <ul>
      <li v-for="item of items">
        <div style="display: flex">
          <span style="flex-grow: 1">{{ item }}</span>
          <button @click="$emit('click:edit', item)">edit</button>
          <button @click="remove(item)">remove</button>
        </div>
      </li>
      <li>
        <div style="display: flex">
          <span style="flex-grow: 1">
            <input type="text" />
          </span>
          <button @click="$emit('click:add')">add</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (evnet: 'click:edit', item: unknown): void
  (evnet: 'click:add'): void
}>()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

const endpoint = import.meta.env.VITE_API_URL

interface Item {
  id: string
}

export default defineComponent({
  data() {
    return {
      items: [] as Item[],
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    async refresh() {
      this.items = await fetch(endpoint).then((r) => r.json())
    },
    async remove(item: Item) {
      const { ok } = await fetch(endpoint + `/${item.id}`, { method: 'DELETE' })
      if (ok) {
        const index = this.items.indexOf(item)
        if (index >= 0) this.items.splice(index, 1)
      }
    },
  },
})
</script>
