<template>
  <view-selector :items="[{ name: 'table', scope: 'write' }]"></view-selector>
  <view-item name="table">
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>スケジュール</th>
          <th>
            <button @click="add">add</button>
            <button @click="refresh">refresh</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item of items">
          <tr v-if="edits.includes(item)" :key="item.url">
            <td>
              <input v-model="item.title" type="text" />
            </td>
            <td>
              <input v-model="item.schedules" type="text" />
            </td>
            <td>
              <button @click="save(item)">save</button>
              <button @click="cancel(item)">cancel</button>
            </td>
          </tr>
          <tr v-else>
            <td>{{ item.title }}</td>
            <!-- <td>{{ item.schedules }}</td> -->
            <td>
              <div style="display: flex; justify-content: space-around">
                <div style="margin: 0 1em">4月</div>
                <div style="margin: 0 1em">5月</div>
              </div>
              <div style="display: flex; justify-content: space-around">
                <div style="margin: 0 1em">
                  <div>いろをさぐれ1</div>
                  <div>いろをさぐれ2</div>
                </div>
                <div style="margin: 0 1em">
                  <div>イネのかがく1</div>
                  <div>イネのかがく2</div>
                </div>
              </div>
            </td>
            <td>
              <a :href="item.url">detail</a>
              <button @click="edit(item)">edit</button>
              <button @click="remove(item)">remove</button>
              <button>実体化</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </view-item>
  <view-item>
    <h1>Class</h1>
    <template v-for="item of items">
      <div>{{ item.title }}</div>
    </template>
  </view-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { v4 as uuid } from 'uuid'
import ViewSelector from '../components/ViewSelector.vue'
import ViewItem from '../components/ViewItem.vue'

interface Item {
  url: string
  title?: string
  subtitle?: string
  schedules?: { date: Date; experiment: string }[]
}

export default defineComponent({
  components: { ViewSelector, ViewItem },
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
