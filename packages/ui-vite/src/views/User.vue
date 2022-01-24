<template>
  <view-selector :items="[{ name: 'table', scope: 'read' }]"></view-selector>
  <view-item name="table">
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

export default defineComponent({
  components: { ViewSelector, ViewItem, EditableTable },
  data() {
    return {
      items: [] as any[],
      columns: [
        { text: '識別子', value: 'id' },
        { text: '名称', value: 'name' },
        { text: '教室', value: 'departments' },
      ],
      departments: [] as any[],
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    async refresh() {
      this.items = await this.$api.get('/user')
      this.departments = await this.$api.get('/department')
    },
  },
})
</script>
