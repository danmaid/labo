import { create, get, update, remove } from './dynamodb'

describe('js オブジェクトを元に CRUD 操作を行えること', () => {
  const table = 'items'
  const obj = { title: 'title', index: 1 }

  let id: string
  it('CREATE', async () => {
    id = await create(table, obj)
    expect(id).toStrictEqual(expect.any(String))
  })

  let stored
  it('READ', async () => {
    stored = await get(table, id)
    expect(stored).toMatchObject(obj)
  })

  it('UPDATE', async () => {
    const expected = { ...obj, title: 'updated' }
    await update(table, id, expected)
    const after = await get(id)
    expect(after).toMatchObject(expected)
  })

  it('DELETE', async () => {
    await remove(table, id)
    await expect(() => get(id)).rejects.toThrow()
  })
})
