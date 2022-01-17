<template>
  <slot name="contents">
    <ul>
      <slot name="item" v-for="item of data" :item="item">
        <slot name="item.contents">
          <li>{{ item.hoge }}</li>
        </slot>
        <slot name="item.actions">
          <button>delete</button>
        </slot>
      </slot>
    </ul>
  </slot>
  <slot name="actions" @click="$emit('click:actions')">
    <button @click="$emit('click:add')">add</button>
  </slot>
</template>

<script setup lang="ts">
const props = defineProps<{
  data?: Record<string, unknown>[]
}>()

const emit = defineEmits<{
  (event: 'click:actions'): void
  (event: 'click:add'): void
}>()
</script>