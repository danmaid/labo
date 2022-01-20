<template>
  <view-selector :items="[{ name: 'table' }]"></view-selector>
  <view-item name="table">
    <table>
      <thead>
        <tr>
          <template v-for="column of scopedColumns">
            <th>
              <div>{{ column.text }}</div>
              <div style="font-weight: initial; font-size: 0.5em">{{ column.value }}</div>
              <div style="font-style: italic; font-size: 0.5em">{{ column.scope }}</div>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="item of items">
          <tr>
            <template v-for="column of scopedColumns">
              <td>
                <slot :name="`item.${column.value}`">{{ item[column.value] }}</slot>
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </view-item>
  <view-item>
    <div class="home" style="position: relative">
      <Snow style="position: absolute; z-index: -1"></Snow>
      <div class="contents">
        <Memo></Memo>
      </div>
    </div>
  </view-item>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import ViewSelector from '../components/ViewSelector.vue'
import ViewItem from '../components/ViewItem.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Snow: defineAsyncComponent(() => import('./Snow.vue')),
    Memo: defineAsyncComponent(() => import('./Memo.vue')),
    ViewSelector,
    ViewItem,
  },
  data() {
    return {
      columns: [
        { text: 'resource', value: 'resource' },
        { text: '名称', value: 'name' },
        { text: '色', value: 'color', inputType: 'color' },
        { text: '教室', value: 'department', scope: 'read' },
        { text: '組', value: 'class', scope: 'read' },
        { text: '題名', value: 'title' },
        { text: 'スケジュール', value: 'schedules' },
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
        { text: '定義', value: 'definition' },
        { text: 'source', value: 'source' },
        { text: 'ID', value: 'id' },
      ],
      courses: [] as { id: string }[],
      classes: [] as { id: string }[],
      experiments: [] as { id: string }[],
      schedules: [] as { id: string }[],
    }
  },
  computed: {
    items(): (Record<string, unknown> & { id: string })[] {
      return ([] as { id: string }[]).concat(
        this.courses.map((v) => ({ ...v, resource: 'course' })),
        this.classes.map((v) => ({ ...v, resource: 'classes' })),
        this.experiments.map((v) => ({ ...v, resource: 'experiments' })),
        this.schedules.map((v) => ({ ...v, resource: 'schedules' }))
      )
    },
    scopedColumns(): { value: string; text?: string; inputType?: string; scope?: string }[] {
      return this.columns.filter((v) => !v.scope || this.$scope.hasScope(v.scope))
    },
  },
  mounted() {
    this.refresh()
  },
  methods: {
    async refresh() {
      await Promise.all([
        this.$api.get<{ id: string }[]>('/courses').then((v) => (this.courses = v)),
        this.$api.get<{ id: string }[]>('/classes').then((v) => (this.classes = v)),
        this.$api.get<{ id: string }[]>('/experiments').then((v) => (this.experiments = v)),
        this.$api.get<{ id: string }[]>('/schedules').then((v) => (this.schedules = v)),
      ])
    },
  },
})
</script>

<style>
.contents {
  background-color: rgba(100, 100, 255, 0.5);
  color: #fff;
  margin: 0 100px;
}
</style>
