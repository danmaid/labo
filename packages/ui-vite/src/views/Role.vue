<template>
  <view-selector :items="[{ name: 'table', scope: 'read' }]"></view-selector>
  <view-item name="table">
    <Table :columns="columns" :items="items"></Table>
  </view-item>
  <view-item>
    <h1>Role</h1>
    <template v-for="item of items">
      <div>{{ item.title }}</div>
    </template>
  </view-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ViewSelector from '../components/ViewSelector.vue'
import ViewItem from '../components/ViewItem.vue'
import Table from '../components/Table.vue'

export default defineComponent({
  components: { ViewSelector, ViewItem, Table },
  data() {
    return {
      items: [] as any[],
      columns: [
        { text: '識別子', value: 'id' },
        { text: '名称', value: 'name' },
        { text: '題名', value: 'title' },
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
      this.items = await this.$api.get('/role')
      this.departments = await this.$api.get('/department')
    },
  },
})
</script>
