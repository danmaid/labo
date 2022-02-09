<template>
  <h1>labo</h1>
  <SubmitMemo></SubmitMemo>
  <EventReceiver v-slot="{ events }">
    <ObjectTable :items="events"></ObjectTable>
  </EventReceiver>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SubmitMemo from './components/SubmitMemo.vue'
import EventReceiver from './components/EventReceiver.vue'
import ObjectTable from './components/ObjectTable.vue'

export default defineComponent({
  components: { SubmitMemo, EventReceiver, ObjectTable },
})
</script>
