<template>
  <fieldset style="position: absolute; top: 8px; right: 8px">
    <legend>主体(subject)</legend>
    <div>
      利用者(user)
      <template v-for="(item, i) of users">
        <label :for="`user-${i}`">{{ item.name }}</label>
        <input type="radio" :id="`user-${i}`" :value="item.id" v-model="user" />
      </template>
    </div>
    <fieldset>
      <div>
        役割(role)
        <template v-for="(item, i) of roles">
          <label :for="`role-${i}`">{{ item.name }}</label>
          <input type="checkbox" :id="`role-${i}`" :value="item.id" v-model="role" />
        </template>
      </div>
    </fieldset>
    <div>
      権限(scope)
      <template v-for="(item, i) of scopes">
        <label :for="`scope-${i}`">{{ item.name }}</label>
        <input type="checkbox" :id="`scope-${i}`" :value="item.id" v-model="scope" />
      </template>
    </div>
  </fieldset>
  <div>
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
    <router-link to="/rooms">Room</router-link> | <router-link to="/room-timeline">RoomTimeline</router-link> |
    <router-link to="/courses">Course</router-link> | <router-link to="/classes">Class</router-link> |
    <router-link to="/experiments">Experiment</router-link> | <router-link to="/schedules">Schedules</router-link> |
    <router-link to="/resource">Resource</router-link> | <router-link to="/user">User</router-link>
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
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      user: undefined,
      users: [] as { id: string; name: string }[],
      role: [],
      roles: [] as { id: string; name: string }[],
      scope: [],
      scopes: [] as { id: string; name: string }[],
    }
  },
  mounted() {
    this.getUsers()
    this.getRoles()
    this.getScopes()
  },
  methods: {
    async getUsers() {
      this.users = await this.$api.get('/user')
    },
    async getRoles() {
      this.roles = await this.$api.get('/role')
    },
    async getScopes() {
      this.scopes = await this.$api.get('/scope')
    },
  },
})
</script>
