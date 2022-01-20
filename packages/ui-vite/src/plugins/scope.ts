import { Plugin, reactive } from 'vue'

class Scope {
  read = false
  write = false

  hasScope(scope?: string): boolean {
    if (!scope) return this.read || this.write
    if (scope === 'read') return this.read
    if (scope === 'write') return this.write
    return false
  }
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
