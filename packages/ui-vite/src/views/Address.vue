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
      <template #item.map_url="{ value }">{{ value && `${value.slice(0, 10)}...` }}</template>
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
    <h1>Address</h1>
    <template v-for="item of items">
      <div>
        <a :href="`/address/${item.id}`">{{ item.name }}</a>
      </div>
    </template>
    <iframe
      src="https://www.google.com/maps/d/embed?mid=14f9fIlAmbAIGiKuETnPyWylfrwEqY2li&ehbc=2E312F"
      width="640"
      height="480"
    ></iframe>
  </view-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ViewSelector from '../components/ViewSelector.vue'
import ViewItem from '../components/ViewItem.vue'
import Table from '../components/Table.vue'
import Combobox from '../components/Combobox.vue'

export default defineComponent({
  components: { ViewSelector, ViewItem, Table, Combobox },
  data() {
    return {
      items: [] as any[],
      columns: [
        { text: '識別子', value: 'id' },
        { text: '名称', value: 'name' },
        { text: '郵便番号', value: 'postal_code' },
        { text: '都道府県', value: 'region' },
        { text: '市区町村', value: 'locality' },
        { text: '町名以降', value: 'street_address' },
        { text: 'マップURL', value: 'map_url' },
        { text: '', value: 'actions' },
      ],
      id: undefined,
      edits: [] as string[],
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    async refresh() {
      this.items = await this.$api.get('/address')
    },
    async add() {
      await this.$api.put(`/address/${this.id}`, {})
      this.refresh()
    },
    cancel(id: string) {
      const index = this.edits.indexOf(id)
      if (index >= 0) this.edits.splice(index, 1)
    },
    async save(id: string, item: any) {
      await this.$api.put(`/address/${id}`, item)
      this.cancel(id)
      this.refresh()
    },
    async remove(id: string) {
      await this.$api.delete(`/address/${id}`)
      this.refresh()
    },
  },
})
</script>
