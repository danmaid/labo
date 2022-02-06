<template>
  <h1>labo</h1>
  <SubmitMemo></SubmitMemo>
  <EventReceiver></EventReceiver>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SubmitMemo from './components/SubmitMemo.vue'
import EventReceiver from './components/EventReceiver.vue'

export default defineComponent({
  components: { SubmitMemo, EventReceiver },
})
</script>
