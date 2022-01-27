# core

## layer 0 main loop

組織のメインループを処理する。すべてのイベントをすべてのリスナーに送るだけ。

- `type Key = string`
- `type Event = Record<Key, unknown>`
- `emit: (event?: Event): void`
- `on: (listener: (event?: Event) => void): void`
- Interface は HTTP
  - emit -> POST /
    - Body: `JSON.stringify(Event)`
  - on -> GET / (WebSocket)
    - Upgrade: websocket
    - @message: `JSON.stringify(Event)`

## layer 1

- `on: (keys: Key[], listener: (event: Pick<Event, Key[]>) => void): void`

- 認可情報(Authorization Header)の検証を実施(外部委託 introspection endpoint)
- GET
- POST
- WebSocket
