<template>
  <view-selector :items="[{ name: 'table' }]"></view-selector>
  <view-item name="table">
    <Table :columns="columns" :items="items">
      <template #header.actions>
        <button @click="refresh">refresh</button>
      </template>
      <template v-for="id of edits" #[`row.${id}`]="{ item }">
        <tr>
          <td><input v-model.lazy="item.id" /></td>
          <td><input v-model="item.name" /></td>
          <td><Select v-model="item.address" :items="addressesForSelect"></Select></td>
          <td><input v-model="item.phone_number" /></td>
          <td>
            <button @click="save(id, item)">save</button>
            <button @click="cancel(id)">cancel</button>
          </td>
        </tr>
      </template>
      <template #item.phone_number="{ value }">
        <a :href="`tel://${value}`" target="_blank">{{ value }}</a>
      </template>
      <template #item.address="{ value }">
        <a :href="`/address/${value}`" target="_blank">{{ value }}</a>
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
  </view-item>
  <view-item>
    <h1>Department</h1>
    <template v-for="item of items">
      <div>
        <a :href="`/department/${item.id}`">{{ item.name }}</a>
      </div>
    </template>
  </view-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ViewSelector from '../components/ViewSelector.vue'
import ViewItem from '../components/ViewItem.vue'
import Table from '../components/Table.vue'
import Select from '../components/Select.vue'

export default defineComponent({
  components: { ViewSelector, ViewItem, Table, Select },
  data() {
    return {
      items: [] as any[],
      columns: [
        { text: '識別子', value: 'id' },
        { text: '名称', value: 'name' },
        { text: '住所', value: 'address' },
        { text: '電話番号', value: 'phone_number' },
        { text: '', value: 'actions' },
      ],
      edits: [] as string[],
      id: undefined,
      addresses: [] as any[],
    }
  },
  computed: {
    addressesForSelect(): { text: string; value: string }[] {
      return this.addresses.map((v) => ({ text: v.name, value: v.id }))
    },
  },
  mounted() {
    this.refresh()
  },
  methods: {
    async refresh() {
      this.items = await this.$api.get('/department')
      this.addresses = await this.$api.get('/address')
    },
    async add() {
      await this.$api.put(`/department/${this.id}`, {})
      this.refresh()
    },
    cancel(id: string) {
      const index = this.edits.indexOf(id)
      if (index >= 0) this.edits.splice(index, 1)
    },
    async save(id: string, item: any) {
      await this.$api.put(`/department/${id}`, item)
      this.cancel(id)
      this.refresh()
    },
    async remove(id: string) {
      await this.$api.delete(`/department/${id}`)
      this.refresh()
    },
  },
})
</script>
