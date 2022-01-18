<template>
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>test</th>
        <th>
          <button @click="add">add</button>
          <button @click="refresh">refresh</button>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item of items">
        <tr v-if="edits.includes(item)">
          <td><input type="text" /></td>
          <td><input type="text" /></td>
          <td>
            <button @click="$emit('save')">save</button>
            <button @click="cancel(item)">cancel</button>
          </td>
        </tr>
        <tr v-else>
          <td>{{ item.id }}</td>
          <td>{{ item.test }}</td>
          <td>
            <button @click="edit(item)">edit</button>
            <button @click="remove(item)">remove</button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { v4 as uuid } from 'uuid'

const endpoint = import.meta.env.VITE_API_URL

interface Item {
  id: string
  test?: string
}

export default defineComponent({
  data() {
    return {
      items: [] as Item[],
      edits: [] as Item[],
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
    edit(item: Item) {
      this.edits.push(item)
    },
    cancel(item: Item) {
      const index = this.edits.indexOf(item)
      if (index >= 0) this.edits.splice(index, 1)
    },
    add() {
      const item = { id: uuid() }
      this.items.push(item)
      this.edits.push(item)
    },
  },
})
</script>
