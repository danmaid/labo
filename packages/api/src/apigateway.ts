interface ProxyEvent {
  pathParameters: Record<string, string>
}

interface ProxyResponse {
  statusCode: number
  body?: unknown
}

interface handler {
  (event: ProxyEvent): Promise<ProxyResponse>
}

// GET /{tablename}
export const getsHandler: handler = async (event) => {
  return { statusCode: 200 }
}

// POST /{tablename}
export const postsHandler: handler = async (event) => {
  return { statusCode: 201 }
}

// GET /{tablename}/{id}
export const getHandler: handler = async (event) => {
  return { statusCode: 200 }
}

// PUT /{tablename}/{id}
export const putHandler: handler = async (event) => {
  return { statusCode: 200 }
}

// DELETE /{tablename}/{id}
export const deleteHandler: handler = async (event) => {
  return { statusCode: 200 }
}
