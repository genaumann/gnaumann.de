export const basePath =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_URL}`
    : 'http://localhost:3000'
