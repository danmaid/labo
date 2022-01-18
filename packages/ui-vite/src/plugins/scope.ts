import { Plugin, reactive } from 'vue'

class Scope {
  read = false
  write = false
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $scope: Scope
  }
}

export const scope: Plugin = {
  install: (app) => {
    app.config.globalProperties.$scope = reactive(new Scope())
  },
}
