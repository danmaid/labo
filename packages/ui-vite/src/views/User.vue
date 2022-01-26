<template>
  <view-selector :items="[{ name: 'table', scope: 'read' }]"></view-selector>
  <view-item name="table">
    <Table :columns="columns" :items="templates" caption="テンプレート">
      <template #tfoot>
        <tr>
          <td><input v-model="id" /></td>
          <td><button @click="addTemplate">add</button></td>
        </tr>
      </template>
    </Table>
    <Table :columns="columns" :items="instances" caption="インスタンス">
      <template #tfoot>
        <tr>
          <td><Combobox v-model="template" :list="templates.map((v) => v.id)"></Combobox></td>
          <td><button @click="addInstance">add</button></td>
        </tr>
      </template>
    </Table>
    <editable-table :columns="columns">
      <template #item.departments="{ value }">{{ value?.[0] }}hoge</template>
    </editable-table>
  </view-item>
  <view-item>
    <h1>User</h1>
    <template v-for="item of items">
      <div>{{ item.title }}</div>
    </template>
  </view-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ViewSelector from '../components/ViewSelector.vue'
import ViewItem from '../components/ViewItem.vue'
import EditableTable from '../components/EditableTable.vue'
import Table from '../components/Table.vue'
import Combobox from '../components/Combobox.vue'

export default defineComponent({
  components: { ViewSelector, ViewItem, EditableTable, Table, Combobox },
  data() {
    return {
      items: [] as any[],
      columns: [
        { text: '識別子', value: 'id' },
        { text: '名称', value: 'name' },
        { text: '教室', value: 'departments' },
        { text: 'テンプレート', value: 'template' },
      ],
      departments: [] as any[],
      id: undefined,
      template: undefined,
    }
  },
  computed: {
    templates(): any[] {
      return this.items.filter((v) => v.template === true)
    },
    instances(): any[] {
      return this.items.filter((v) => v.template !== true)
    },
  },
  mounted() {
    this.refresh()
  },
  methods: {
    async refresh() {
      this.items = await this.$api.get('/user')
      this.departments = await this.$api.get('/department')
    },
    async addTemplate() {
      await this.$api.put(`/user/${this.id}`, { template: true })
      this.refresh()
    },
    async addInstance() {
      await this.$api.post('/user', { template: this.template })
      this.refresh()
    },
  },
})
</script>
