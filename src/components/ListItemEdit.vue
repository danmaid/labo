<template>
  <template v-if="editing">
    <input v-model="input" type="text" />
    <button @click="change">変更</button>
    <button @click="editing = false">キャンセル</button>
  </template>
  <template v-else>
    <slot></slot>
    <button @click="editing = true">変更</button>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: { type: String }
  },
  emits: ['change', 'delete'],
  data() {
    return {
      input: this.value,
      editing: false
    }
  },
  watch: {
    value(v) { if (v !== this.input) this.input = v }
  },
  methods: {
    change() {
      this.$emit('change', this.input)
      this.editing = false
    }
  }
})
</script>
