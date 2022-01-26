<template>
  <view-selector :items="[{ name: 'table' }]"></view-selector>
  <view-item name="table">
    <Table :columns="scopedColumns" :items="filteredItems"></Table>
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
        { text: '名称', value: 'name' },
        { text: '教室', value: 'department', scope: 'department' },
        { text: '組', value: 'class', scope: 'class' },
        { text: 'source', value: 'source' },
        { text: 'ID', value: 'id' },
      ],
      items: [] as any[],
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
  },
})
</script>
