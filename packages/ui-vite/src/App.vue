<template>
  <aside style="position: absolute; top: 8px; right: 8px">
    <Auth></Auth>
  </aside>
  <div>
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
    <router-link to="/rooms">Room</router-link> | <router-link to="/room-timeline">RoomTimeline</router-link> |
    <router-link to="/courses">Course</router-link> | <router-link to="/class">Class</router-link> |
    <router-link to="/experiments">Experiment</router-link> | <router-link to="/schedules">Schedules</router-link> |
    <router-link to="/resource">Resource</router-link> | <router-link to="/user">User</router-link> |
    <router-link to="/column">Column</router-link> | <router-link to="/role">Role</router-link>
  </div>
  <div>
    アクセス許可(scope)
    <input id="public" type="checkbox" disabled checked />
    <label for="public">public</label>
    <template v-for="(_, key) of $scope">
      <input v-model="$scope[key]" :id="key" type="checkbox" />
      <label :for="key">{{ key }}</label>
    </template>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'

export default defineComponent({
  components: {
    Auth: defineAsyncComponent(() => import('./components/Auth.vue')),
  },
})
</script>
