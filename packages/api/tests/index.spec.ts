import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { handler } from '../src/index'

const ddb = DynamoDBDocument.from(new DynamoDB({}))

it('should insert item into table', async () => {
  await ddb.put({ TableName: 'files', Item: { id: '1', hello: 'world' } })
  const result = await handler()

  expect(result).toEqual({
    id: '1',
    hello: 'world',
  })
})
