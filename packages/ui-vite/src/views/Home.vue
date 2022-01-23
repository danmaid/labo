<template>
  <view-selector :items="[{ name: 'table' }]"></view-selector>
  <view-item name="table">
    <table>
      <caption>
        サマリ
      </caption>
      <thead>
        <th>リソース</th>
        <th>サイズ</th>
        <th><button @click="refresh">refresh</button></th>
      </thead>
      <tbody>
        <tr v-for="item of summary">
          <td>{{ item.resource }}</td>
          <td>{{ item.size }}</td>
          <td><button @click="add(item.resource)">add</button></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td><input v-model="resource" /></td>
          <td><button @click="add(resource)">add</button></td>
        </tr>
      </tfoot>
    </table>

    <table>
      <caption>
        データ
      </caption>
      <thead>
        <tr>
          <template v-for="column of scopedColumns">
            <th>
              <div>{{ column.text }}</div>
              <div v-if="$scope.dev" style="font-weight: initial; font-size: 0.5em">{{ column.value }}</div>
              <div v-if="$scope.dev" style="font-weight: initial; font-style: italic; font-size: 0.5em">
                {{ column.scope }}
              </div>
            </th>
          </template>
          <th>
            <button @click="refresh">refresh</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item of items">
          <tr v-if="edits.includes(item)" :key="`/${item.resource}/${item.id}`">
            <template v-for="column of scopedColumns">
              <td>
                <slot :name="`edit.${column.value}`" :item="item" :value="item[column.value]">
                  <input v-model="item[column.value]" :type="column.inputType" />
                </slot>
              </td>
            </template>
            <td>
              <button @click="save(item)">save</button>
              <button @click="cancel(item)">cancel</button>
            </td>
          </tr>
          <tr v-else>
            <template v-for="column of scopedColumns">
              <td style="border-bottom: 1px solid; border-right: 1px solid">
                <slot :name="`item.${column.value}`">{{ item[column.value] }}</slot>
              </td>
            </template>
            <td>
              <button v-if="$scope.write" @click="edit(item)">edit</button>
              <button v-if="$scope.write" @click="remove(item)">remove</button>
            </td>
          </tr>
        </template>
        <tr v-if="$scope.write">
          <td><Combobox v-model="resource" :list="resources.map((v) => v.id)"></Combobox></td>
          <td><button @click="add">add</button></td>
        </tr>
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
import { v4 as uuid } from 'uuid'
import Combobox from '../components/Combobox.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Snow: defineAsyncComponent(() => import('./Snow.vue')),
    Memo: defineAsyncComponent(() => import('./Memo.vue')),
    ViewSelector,
    ViewItem,
    Combobox,
  },
  data() {
    return {
      columns: [
        { text: 'リソース', value: 'resource' },
        { text: '識別子', value: 'id' },
        { text: '名称', value: 'name' },
        { text: '対象', value: 'target' },
        { text: 'scopes', value: 'scopes' },
        { text: 'roles', value: 'roles' },
        { text: '色', value: 'color', inputType: 'color' },
        { text: '教室', value: 'departments', scope: 'read' },
        { text: '組', value: 'class', scope: 'read' },
        { text: '題名', value: 'title' },
        { text: 'スケジュール', value: 'schedules' },
        // { text: '年', value: 'year', inputType: 'number', scope: 'dev' },
        // { text: '月', value: 'month', inputType: 'number', scope: 'dev' },
        // { text: '日', value: 'day', inputType: 'number', scope: 'dev' },
        // { text: '時', value: 'hour', inputType: 'number', scope: 'dev' },
        // { text: '分', value: 'minute', inputType: 'number', scope: 'dev' },
        // { text: '秒', value: 'second', inputType: 'number', scope: 'dev' },
        // { text: '長さ', value: 'length', scope: 'dev' },
        { text: '概要', value: 'summary' },
        // { text: '開始', value: 'start', inputType: 'datetime-local' },
        // { text: '終了', value: 'end', inputType: 'datetime-local' },
        { text: '定義', value: 'definition' },
        { text: 'refs', value: 'refs', scope: 'dev' },
        { text: 'source', value: 'source', scope: 'dev' },
      ],
      items: [] as any[],
      edits: [] as any[],
      resources: [] as any[],
      resource: '',
      summary: [] as any[],
    }
  },
  computed: {
    scopedColumns(): { value: string; text?: string; inputType?: string; scope?: string }[] {
      return this.columns.filter((v) => !v.scope || this.$scope.hasScope(v.scope))
    },
  },
  mounted() {
    this.refresh()
  },
  methods: {
    async refresh() {
      this.items = await this.$api.get('/')
      this.getResources()
      this.summary = await this.$api.get('/index.json')
    },
    async add(resource: string) {
      const id = await this.$api.post(`/${resource}`, {})
      console.log(id)
      this.refresh()
    },
    edit(item: any) {
      this.edits.push(item)
    },
    cancel(item: any) {
      const index = this.edits.indexOf(item)
      if (index >= 0) this.edits.splice(index, 1)
    },
    async save(item: any) {
      this.$api.put(`/${item.resource}/${item.id}`, item)
      const index = this.edits.indexOf(item)
      if (index >= 0) this.edits.splice(index, 1)
    },
    async remove(item: any) {
      const ok = await this.$api.delete(`/${item.resource}/${item.id}`)
      if (ok) {
        const index = this.items.indexOf(item)
        if (index >= 0) this.items.splice(index, 1)
      }
    },
    async getResources() {
      this.resources = await this.$api.get('/resource')
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
