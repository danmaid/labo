<template>
  <table>
    <thead>
      <tr>
        <th>部屋</th>
        <th>1/19 0:00 - 1/19 23:59</th>
        <th>1/20 0:00 - 1/20 23:59</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>A</td>
        <td style="position: relative; overflow: hidden">
          <div style="background-color: #aaf; width: 100px; height: 24px; position: absolute; left: 0; top: 0"></div>
          <div
            style="background-color: #aaf; width: 100px; height: 24px; position: absolute; left: 150px; top: 0"
          ></div>
        </td>
      </tr>
      <tr>
        <td>B</td>
      </tr>
      <tr>
        <td>C</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {}
  },
})
</script>
