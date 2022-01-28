# core

組織のメインループを処理する。

- `type Key = string`
- `type Event = Record<Key, unknown>`
- `emit: (event?: Event): void`
- `on: (listener: (event: Partial<Event>) => void, filter: any): void`

- Interface は HTTP
  - emit -> POST /
    - Body: `JSON.stringify(Event)`
  - on -> GET / (WebSocket)
    - Upgrade: websocket
    - @message: `JSON.stringify(Event)`

## layer 1

- `on: (filter: any, listener: (event: Pick<Event, Key[]>) => void): void`

- 認可情報(Authorization Header)の検証を実施(外部委託 introspection endpoint)
- GET
- POST
- WebSocket

```
{ key: 'value' }

{ key: 'value' } -> { key: 'value' }
{ key: 'valueX' } -> {}
{ key: true } -> { key: 'value' }
{} -> {}
true -> { key: 'value' }
[{ key: 'value' }, { key: 'valueX' }] -> { key: 'value' }
```
