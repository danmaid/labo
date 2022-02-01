<template>
  <table>
    <caption>
      {{
        caption
      }}
    </caption>
    <thead>
      <tr>
        <template v-for="column of columns">
          <th>
            <slot :name="`header.${column.value}`">{{ column.text }}</slot>
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-for="item of items">
        <slot :name="`row.${item.id}`" :item="item">
          <tr>
            <template v-for="column of columns">
              <td>
                <slot :name="`item.${column.value}`" :item="item" :value="item[column.value]">{{
                  item[column.value]
                }}</slot>
              </td>
            </template>
          </tr>
        </slot>
      </template>
    </tbody>
    <tfoot>
      <slot name="tfoot"></slot>
    </tfoot>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface Column {
  value: string
  text?: string
  inputType?: string
}

export default defineComponent({
  props: {
    columns: { type: Array as PropType<Column[]> },
    items: { type: Array as PropType<Record<string, any>[]> },
    caption: { type: String },
  },
})
</script>
