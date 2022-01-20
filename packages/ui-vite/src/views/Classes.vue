<template>
  <view-selector :items="[{ name: 'table' }]"></view-selector>
  <view-item name="table">
    <editable-table :columns="scopedColumns"></editable-table>
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
import ViewSelector from '../components/ViewSelector.vue'
import ViewItem from '../components/ViewItem.vue'
import EditableTable, { Column } from '../components/EditableTable.vue'

interface Item {
  url: string
  title?: string
}

export default defineComponent({
  components: { ViewSelector, ViewItem, EditableTable },
  data() {
    return {
      columns: [
        { text: '名称', value: 'name' },
        { text: '教室', value: 'department', scope: 'read' },
        { text: '組', value: 'class', scope: 'read' },
        { text: 'source', value: 'source' },
        { text: 'ID', value: 'id' },
      ],
      items: [] as Item[],
    }
  },
  computed: {
    scopedColumns(): Column[] {
      return this.columns.filter((v) => !v.scope || this.$scope.hasScope(v.scope))
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
  },
})
</script>
