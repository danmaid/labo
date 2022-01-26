<template>
  <label :for="id">{{ label }}</label>
  <select :id="id" v-model="value">
    <option v-for="item of items" :value="item.value">{{ item.text }}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

let index = 0
export default defineComponent({
  props: {
    label: { type: String },
    items: { type: Array as PropType<{ text: string; value: string }[]> },
    id: { type: String, default: () => `select-${++index}` },
    modelValue: { type: String },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      value: this.modelValue,
    }
  },
  watch: {
    modelValue(v) {
      if (v !== this.value) this.value = v
    },
    value(v) {
      this.$emit('update:modelValue', v)
    },
  },
})
</script>
