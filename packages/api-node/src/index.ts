// import { server } from './server'
// import { server } from './simple'
import { Core, SimpleIO } from './Core'
import { Http } from './Http'
import { FileSystem } from './FileSystem'

const core = new Core()

const plugins: SimpleIO[] = [new Http(), new FileSystem()]
for (const plugin of plugins) {
  core.on((event) => plugin.emit(event))
  plugin.on((message) => core.emit(message))
}
