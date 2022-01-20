<template>
  <view-selector :items="[{ name: 'table', scope: 'read' }]"></view-selector>
  <view-item name="table">
    <editable-table :columns="columns"></editable-table>
  </view-item>
  <view-item>
    <h1>Schedule</h1>
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

interface Item {
  url: string
  start?: Date
  end?: Date
  summary?: string
}

export default defineComponent({
  components: { ViewSelector, ViewItem, EditableTable },
  data() {
    return {
      items: [] as Item[],
      columns: [
        { text: '年', value: 'year', inputType: 'number' },
        { text: '月', value: 'month', inputType: 'number' },
        { text: '日', value: 'day', inputType: 'number' },
        { text: '時', value: 'hour', inputType: 'number' },
        { text: '分', value: 'minute', inputType: 'number' },
        { text: '秒', value: 'second', inputType: 'number' },
        { text: '長さ', value: 'length' },
        { text: '概要', value: 'summary' },
        { text: '開始', value: 'start', inputType: 'datetime-local' },
        { text: '終了', value: 'end', inputType: 'datetime-local' },
        { text: '定義', value: 'definition' }
      ]
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
  },
})
</script>
