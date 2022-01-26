<template>
  <view-selector :items="[{ name: 'table' }]"></view-selector>
  <view-item name="table">
    <editable-table :columns="scopedColumns"></editable-table>
  </view-item>
  <view-item>
    <h1>Column</h1>
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

export default defineComponent({
  components: { ViewSelector, ViewItem, EditableTable },
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
  },
  mounted() {
    this.refresh()
    this.getColumns()
  },
  methods: {
    async refresh() {
      this.items = await this.$api.get<{ id: string }[]>('column')
    },
    async getColumns() {
      this.columns = await this.$api.get('/resource/column').then((r) => r.columns)
    },
  },
})
</script>
