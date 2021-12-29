<template>
  <ul>
    <li v-for="item, index of items">
      <ListItemEdit :value="item" @change="items.splice(index, 1, $event)">{{ item }}</ListItemEdit>
      <button @click="items.splice(index, 1)">削除</button>
    </li>
    <form @submit.prevent="items.push(input)">
      <input v-model="input" type="text" />
      <input type="submit" value="追加" />
      <input type="reset" />
    </form>
  </ul>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  components: {
    ListItemEdit: defineAsyncComponent(() => import('@/components/ListItemEdit.vue'))
  },
  data() {
    return {
      items: ['hoge', 'fuga'],
      input: '',
    }
  },
})
</script>
