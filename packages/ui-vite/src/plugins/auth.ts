import { computed, Plugin, reactive } from 'vue'

class Auth extends Map {
  scopes: string[] = []

  has(key: any): boolean {
    return this.hasScope(key) || super.has(key)
  }

  hasScope(key: string): boolean {
    return this.scopes.includes(key)
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $auth: Auth
  }
}

export const auth: Plugin = {
  install: (app) => {
    app.config.globalProperties.$auth = reactive(new Auth())
  },
}
