<template>
  <div>
    <input v-model="value" :list="id" />
    <datalist :id="id">
      <option v-for="item of list">{{ item }}</option>
    </datalist>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

let uid = 0
export default defineComponent({
  props: {
    modelValue: { type: String as PropType<string | undefined> },
    list: { type: Array as PropType<string[]>, default: () => [] },
    id: { type: String, default: () => `combobox-${uid++}` },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      value: this.modelValue,
    }
  },
  watch: {
    value(v) {
      this.$emit('update:modelValue', v)
    },
    modelValue(v) {
      if (v !== this.value) this.value = v
    },
  },
})
</script>
