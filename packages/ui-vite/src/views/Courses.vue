<template>
  <view-selector :items="[{ name: 'table', scope: 'write' }]"></view-selector>
  <view-item name="table">
    <editable-table
      :columns="[{ text: '名称', value: 'name' }, { text: '色', value: 'color', inputType: 'color' }]"
    ></editable-table>
  </view-item>
  <view-item>
    <h1>Course</h1>
    <template v-for="item of items">
      <div>{{ item.name }}</div>
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
  name?: string
  color?: string
}

export default defineComponent({
  components: { ViewSelector, ViewItem, EditableTable },
  data() {
    return {
      items: [] as Item[],
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
