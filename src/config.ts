export const basePath =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.NEXT_URL}`
    : 'http://localhost:3000'
