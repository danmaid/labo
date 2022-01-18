<template>
  <div>
    <input v-model="view" type="radio" name="view" id="detail" :value="undefined" /><label for="detail">detail</label>
    <template v-if="$scope.write">
      <input v-model="view" type="radio" name="view" id="table" value="table" /><label for="table">table</label>
    </template>
  </div>
  <template v-if="view === 'table'">
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
            <td><input v-model="item.name" type="text" /></td>
            <td>
              <button @click="save(item)">save</button>
              <button @click="cancel(item)">cancel</button>
            </td>
          </tr>
          <tr v-else>
            <td>{{ item.name }}</td>
            <td>
              <a :href="item.url">detail</a>
              <button @click="edit(item)">edit</button>
              <button @click="remove(item)">remove</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </template>
  <template v-else>
    <h1>Class</h1>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { v4 as uuid } from 'uuid'

interface Item {
  url: string
  name?: string
}

export default defineComponent({
  data() {
    return {
      items: [] as Item[],
      edits: [] as Item[],
      view: this.$route.query.view,
    }
  },
  watch: {
    view(v) {
      this.$router.replace({ query: { view: v } })
    },
    $route(v) {
      this.view = v.query.view
    },
  },
  mounted() {
    this.refresh()
  },
  methods: {
    async refresh() {
      const items = await this.$api.get<{ id: string }[]>(this.$route.path)
      this.items = items.map((v) => ({ url: `${this.$route.path}/${v.id}`, ...v }))
    },
    async remove(item: Item) {
      const ok = await this.$api.delete(item.url)
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
      this.$api.put(item.url, item)
    },
  },
})
</script>
