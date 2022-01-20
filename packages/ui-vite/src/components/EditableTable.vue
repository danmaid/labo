<template>
  <table>
    <caption>
      {{
        caption
      }}
    </caption>
    <thead>
      <tr>
        <template v-for="column of columns">
          <th>{{ column.text }}</th>
        </template>
        <th>
          <button @click="add">add</button>
          <button @click="refresh">refresh</button>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item of items">
        <tr v-if="edits.includes(item)" :key="item.id">
          <template v-for="column of columns">
            <td>
              <slot :name="`edit.${column.value}`" :item="item" :value="item[column.value]">
                <input v-model="item[column.value]" :type="column.inputType" />
              </slot>
            </td>
          </template>
          <td>
            <button @click="save(item)">save</button>
            <button @click="cancel(item)">cancel</button>
          </td>
        </tr>
        <tr v-else>
          <template v-for="column of columns">
            <td>
              <slot :name="`item.${column.value}`">{{ item[column.value] }}</slot>
            </td>
          </template>
          <td>
            <a :href="`${$route.path}/${item.id}`">detail</a>
            <button @click="edit(item)">edit</button>
            <button @click="remove(item)">remove</button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { v4 as uuid } from 'uuid'

interface Item extends Record<string, unknown> {
  id: string
}

export interface Column {
  value: string
  text?: string
  inputType?: string
}

export default defineComponent({
  props: {
    columns: {
      type: Array as PropType<Column[]>,
    },
    caption: { type: String },
  },
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
      const ok = await this.$api.delete(`${this.$route.path}/${item.id}`)
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
      const item = { id }
      this.items.push(item)
      this.edits.push(item)
    },
    async save(item: Item) {
      this.$api.put(`${this.$route.path}/${item.id}`, item)
      const index = this.edits.indexOf(item)
      if (index >= 0) this.edits.splice(index, 1)
    },
  },
})
</script>
