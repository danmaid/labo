<template>
  <view-selector :items="[{ name: 'table', scope: 'write' }]"></view-selector>
  <view-item name="table">
    <editable-table
      :columns="[{ text: '題名', value: 'title' }, { text: 'パート', value: 'part', inputType: 'number' }]"
    ></editable-table>
  </view-item>
  <view-item>
    <h1>Experiments</h1>
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
  title?: string
  part?: number
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
