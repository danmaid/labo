<template>
  <slot>{{ value }}</slot>
  <slot name="edit">
    <button @click="$emit('click:edit')">edit</button>
  </slot>
  <slot name="remove">
    <button @click="$emit('click:remove')">remove</button>
  </slot>
  <slot name="add">
    <button @click="$emit('click:add')">add</button>
  </slot>
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: unknown
}>()

const emit = defineEmits<{
  (evnet: 'click:edit'): void
  (evnet: 'click:remove'): void
  (evnet: 'click:add'): void
}>()
</script>
