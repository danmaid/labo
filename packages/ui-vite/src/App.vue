<template>
  <div>
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
    <router-link to="/rooms">Room</router-link> | <router-link to="/room-timeline">RoomTimeline</router-link> |
    <router-link to="/courses">Course</router-link> | <router-link to="/classes">Class</router-link> |
    <router-link to="/experiments">Experiment</router-link> | <router-link to="/schedules">Schedules</router-link>
  </div>
  <div>
    <template v-for="(_, key) of $scope">
      <input v-model="$scope[key]" :id="key" type="checkbox" />
      <label :for="key">{{ key }}</label>
    </template>
  </div>
  <router-view></router-view>
</template>
