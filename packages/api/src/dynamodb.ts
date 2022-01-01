import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { v4 as uuid } from 'uuid'

const ddb = DynamoDBDocument.from(new DynamoDB({}))

export async function create(TableName: string, Item: Record<string, unknown>): Promise<string> {
  const id = 'id' in Item ? String(Item.id) : uuid()
  await ddb.put({ TableName, Item: { ...Item, id } })
  return id
}

export async function get() {}
export async function update() {}
export async function remove() {}
