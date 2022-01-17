<template>
  <ul>
    <button @click="getList">更新</button>
    <li v-for="item of items">
      <ListItemEdit :value="item" @change="update">{{ item.body }}</ListItemEdit>
      <button @click="remove(item.id)">削除</button>
    </li>
    <form @submit.prevent="add">
      <input v-model="input" type="text" />
      <input type="submit" value="追加" />
      <input type="reset" />
    </form>
  </ul>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { v4 as uuid } from 'uuid'

const endpoint = import.meta.env.VITE_API_URL

export default defineComponent({
  components: {
    ListItemEdit: defineAsyncComponent(() => import('../components/ListItemEdit.vue')),
  },
  data() {
    return {
      items: [] as any[],
      input: '',
    }
  },
  methods: {
    async getList() {
      this.items = await fetch(endpoint).then((v) => v.json())
    },
    async add() {
      const id = uuid()
      const headers = { 'Content-Type': 'application/json' }
      const body = JSON.stringify({ body: this.input })
      await fetch(`${endpoint}/${id}`, { method: 'PUT', headers, body })
      this.getList()
    },
    async remove(id: string) {
      await fetch(`${endpoint}/${id}`, { method: 'DELETE' })
      this.getList()
    },
    async update(item: any) {
      const { id, ...data } = item
      const headers = { 'Content-Type': 'application/json' }
      const body = JSON.stringify(data)
      await fetch(`${endpoint}/${id}`, { method: 'PUT', headers, body })
      this.getList()
    },
  },
})
</script>
