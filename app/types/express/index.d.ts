declare namespace Express {
  interface Request {
    userId: string,
    headers: {
      "x-access-token": string
    },
    body: {
      roles: string[]
    }
  }
}