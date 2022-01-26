<template>
  <fieldset>
    <legend>主体(subject)</legend>
    <fieldset :disabled="$auth.hasScope('department')">
      <legend>教室(department)</legend>
      <label for="department-a">A</label>
      <input type="checkbox" id="department-a" value="A" v-model="department" />
      <label for="department-b">B</label>
      <input type="checkbox" id="department-b" value="B" v-model="department" />
    </fieldset>
    <fieldset>
      <legend>権限(scope)</legend>
      <label for="scope-department">department</label>
      <input type="checkbox" id="scope-department" value="department" v-model="scopes" />
    </fieldset>
    <!-- <div>
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
    </div> -->
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      department: this.$auth.get('department') || [],
      scopes: this.$auth.scopes,
    }
  },
  watch: {
    department(v: unknown[]) {
      if (!v || v.length === 0) this.$auth.delete('department')
      else this.$auth.set('department', v)
    },
    scopes(v) {
      this.$auth.scopes = v
    },
  },
})
</script>
