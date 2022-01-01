import { DynamoDB, CreateTableCommand } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const ddb = DynamoDBDocument.from(new DynamoDB({}))

export async function handler(event?: any): Promise<any> {
  const { Item } = await ddb.get({ TableName: 'files', Key: { id: '1' } })
  const {Items} = await ddb.scan({ TableName: 'files' })
  const {} = await ddb.delete({TableName: 'files', Key: { id: }})
  ddb.update({})
  return Item
}
