<template>
  <div v-if="views.length > 0">
    <input v-model="selected" type="radio" name="view-selector" id="default" :value="undefined" />
    <label for="default">default</label>
    <template v-for="view of views">
      <input v-model="selected" type="radio" name="view-selector" :id="view" :value="view" />
      <label :for="view">{{ view }}</label>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    items: { type: Array as PropType<{ name: string; scope?: string }[]>, default: () => [] },
  },
  computed: {
    selected: {
      get() {
        return this.$route.query.view?.toString()
      },
      set(v: string) {
        this.$router.replace({ query: { view: v } })
      },
    },
    views(): string[] {
      return this.items.filter((v) => !v.scope || this.$scope.hasScope(v.scope)).map((v) => v.name)
    },
  },
  watch: {
    views() {
      this.noScopeRedirect()
    },
  },
  beforeMount() {
    this.noScopeRedirect()
  },
  methods: {
    noScopeRedirect() {
      if (this.selected && !this.views.includes(this.selected)) {
        this.selected = undefined
      }
    },
  },
})
</script>
