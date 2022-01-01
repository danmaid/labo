const original = jest.requireActual('@aws-sdk/client-dynamodb')

module.exports = {
  ...original,
  DynamoDB: jest.fn(() => {
    return new original.DynamoDB({
      endpoint: 'http://localhost:8000',
      region: 'local-env',
      credentials: { accessKeyId: 'fake', secretAccessKey: 'fake' },
    })
  }),
}
