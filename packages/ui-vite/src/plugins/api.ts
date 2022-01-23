import { Plugin, reactive } from 'vue'

class API {
  headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })

  async get<T = any>(url: string): Promise<T> {
    return fetch(url, { headers: this.headers }).then((r) => r.json())
  }
  async put(url: string, body: any): Promise<boolean> {
    return fetch(url, { method: 'PUT', headers: this.headers, body: JSON.stringify(body) }).then((r) => r.ok)
  }
  async delete(url: string): Promise<boolean> {
    return fetch(url, { method: 'DELETE', headers: this.headers }).then((r) => r.ok)
  }
  async post<T = any>(url: string, body: any): Promise<T> {
    return fetch(url, { method: 'POST', headers: this.headers, body: JSON.stringify(body) }).then((r) => r.json())
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $api: API
  }
}

export const api: Plugin = {
  install: (app) => {
    app.config.globalProperties.$api = new API()
  },
}
