<template>
  <form @submit.prevent="submit">
    <textarea v-model="text"></textarea>
    <input type="submit" value="追加" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: { type: String }
  },
  emits: ['submit'],
  data() {
    return {
      text: this.value
    }
  },
  watch: {
    value(v) { if (v !== this.text) this.text = v }
  },
  methods: {
    submit() {
      this.$emit('submit', this.text)
    }
  }
})
</script>
