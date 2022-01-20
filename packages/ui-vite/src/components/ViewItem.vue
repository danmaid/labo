<template>
  <slot v-if="name === selected"></slot>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    name: { type: String as PropType<string | undefined> },
  },
  computed: {
    selected(): string | undefined {
      return this.$route.query.view?.toString()
    },
  },
})
</script>
