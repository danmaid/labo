<template>
  <table>
    <thead>
      <tr>
        <th>名称</th>
        <th>
          <button @click="add">add</button>
          <button @click="refresh">refresh</button>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item of items">
        <tr v-if="edits.includes(item)" :key="item.url">
          <td><input type="text" /></td>
          <td>
            <button @click="save(item)">save</button>
            <button @click="cancel(item)">cancel</button>
          </td>
        </tr>
        <tr v-else>
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

interface Item {
  url: string
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
      const headers = new Headers()
      headers.append('Accept', 'application/json')
      const items: { id: string }[] = await fetch(this.$route.path, { headers }).then((r) => r.json())
      this.items = items.map((v) => ({ url: `${this.$route.path}/${v.id}`, ...v }))
    },
    async remove(item: Item) {
      const { ok } = await fetch(item.url, { method: 'DELETE' })
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
      const id = uuid()
      const item = { url: `${this.$route.path}/${id}` }
      this.items.push(item)
      this.edits.push(item)
    },
    async save(item: Item) {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      const body = JSON.stringify(item)
      await fetch(item.url, { method: 'PUT', headers, body })
    },
  },
})
</script>
