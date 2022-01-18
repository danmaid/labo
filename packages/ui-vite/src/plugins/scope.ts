import { Plugin, reactive } from 'vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $scope: Record<'read' | 'write', boolean>
  }
}

export const scope: Plugin = {
  install: (app) => {
    app.config.globalProperties.$scope = reactive({
      read: false,
      write: false,
    })
  },
}
