<template>
  <template v-for="item of items">
    <slot :item="item">{{ item }}</slot>
    <slot name="remove" :item="item">
      <button @click="$emit('click:remove', item)">remove</button>
    </slot>
  </template>
  <slot name="push">
    <button @click="$emit('click:push')">push</button>
  </slot>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: unknown[]
}>()

const emit = defineEmits<{
  (evnet: 'click:remove', item: unknown): void
  (evnet: 'click:push'): void
}>()
</script>
