<template>
  <view-selector :items="[{ name: 'table' }]"></view-selector>
  <view-item name="table">
    <Table :columns="scopedColumns" :items="filteredItems">
      <template #header.actions>
        <button @click="refresh">refresh</button>
      </template>
      <template v-for="id of edits" #[`row.${id}`]="{ item }">
        <tr>
          <td><input v-model.lazy="item.id" /></td>
          <td><input v-model="item.name" /></td>
          <td><input v-model="item.postal_code" /></td>
          <td><input v-model="item.region" /></td>
          <td><input v-model="item.locality" /></td>
          <td><input v-model="item.street_address" /></td>
          <td><input v-model="item.map_url" /></td>
          <td>
            <button @click="save(id, item)">save</button>
            <button @click="cancel(id)">cancel</button>
          </td>
        </tr>
      </template>
      <template #item.actions="{ item }">
        <button @click="edits.push(item.id)">edit</button>
        <button @click="remove(item.id)">remove</button>
      </template>
      <template #tfoot>
        <input v-model="id" />
        <button @click="add">add</button>
      </template>
    </Table>
    <editable-table :columns="scopedColumns"></editable-table>
  </view-item>
  <view-item>
    <h1>Class</h1>
    <template v-for="item of items">
      <div>{{ item.name }}</div>
    </template>
  </view-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ViewSelector from '../components/ViewSelector.vue'
import ViewItem from '../components/ViewItem.vue'
import EditableTable, { Column } from '../components/EditableTable.vue'
import Table from '../components/Table.vue'

export default defineComponent({
  components: { ViewSelector, ViewItem, EditableTable, Table },
  data() {
    return {
      columns: [
        { text: '識別子', value: 'id' },
        { text: '名称', value: 'name' },
        { text: '教室', value: 'department', scope: 'department' },
        { text: '組', value: 'class', scope: 'class' },
        { text: 'source', value: 'source' },
        { text: '', value: 'actions' },
      ],
      items: [] as any[],
      edits: [] as string[],
      id: undefined,
    }
  },
  computed: {
    scopedColumns(): Column[] {
      return this.columns.filter((v) => !v.scope || this.$auth.has(v.scope))
    },
    filteredItems(): any[] {
      return this.items.filter((item) => this.scopedColumns.some((v) => !!item[v.value]))
    },
  },
  mounted() {
    this.refresh()
  },
  methods: {
    async refresh() {
      this.items = await this.$api.get<{ id: string }[]>('class')
    },
    async add() {
      await this.$api.put(`/class/${this.id}`, {})
      this.refresh()
    },
    cancel(id: string) {
      const index = this.edits.indexOf(id)
      if (index >= 0) this.edits.splice(index, 1)
    },
    async save(id: string, item: any) {
      await this.$api.put(`/class/${id}`, item)
      this.cancel(id)
      this.refresh()
    },
    async remove(id: string) {
      await this.$api.delete(`/class/${id}`)
      this.refresh()
    },
  },
})
</script>
