<template>
  <view-selector :items="[{ name: 'table', scope: 'write' }]"></view-selector>
  <template v-if="view === 'table'">
    <table>
      <caption>定義</caption>
      <thead>
        <tr>
          <th>年</th>
          <th>月</th>
          <th>日</th>
          <th>時</th>
          <th>分</th>
          <th>秒</th>
          <th>長さ</th>
          <th>概要</th>
          <th>
            <button @click="add">add</button>
            <button @click="refresh">refresh</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item of items">
          <tr v-if="edits.includes(item)" :key="item.url">
            <td><input v-model="item.start" type="datetime-local" /></td>
            <td><input v-model="item.end" type="datetime-local" /></td>
            <td><input v-model="item.summary" type="text" /></td>
            <td>
              <button @click="save(item)">save</button>
              <button @click="cancel(item)">cancel</button>
            </td>
          </tr>
          <tr v-else>
            <td>{{ item.start }}</td>
            <td>{{ item.end }}</td>
            <td>{{ item.summary }}</td>
            <td>
              <a :href="item.url">detail</a>
              <button @click="edit(item)">edit</button>
              <button @click="remove(item)">remove</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <table>
      <caption>実体</caption>
      <thead>
        <tr>
          <th>開始</th>
          <th>終了</th>
          <th>概要</th>
          <th>
            <button @click="add">add</button>
            <button @click="refresh">refresh</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item of items">
          <tr v-if="edits.includes(item)" :key="item.url">
            <td><input v-model="item.start" type="datetime-local" /></td>
            <td><input v-model="item.end" type="datetime-local" /></td>
            <td><input v-model="item.summary" type="text" /></td>
            <td>
              <button @click="save(item)">save</button>
              <button @click="cancel(item)">cancel</button>
            </td>
          </tr>
          <tr v-else>
            <td>{{ item.start }}</td>
            <td>{{ item.end }}</td>
            <td>{{ item.summary }}</td>
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
    <h1>Schedule</h1>
    <template v-for="item of items">
      <div>{{ item.title }}</div>
    </template>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { v4 as uuid } from 'uuid'
import ViewSelector from '../components/ViewSelector.vue'

interface Item {
  url: string
  start?: Date
  end?: Date
  summary?: string
}

export default defineComponent({
  components: { ViewSelector },
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
