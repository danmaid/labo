import express from 'express'
import { initialize } from 'express-openapi'

const app = express()
initialize({
  app,
  apiDoc: './src-api-stub/memo.api.yaml',
})

app.listen(3000)
