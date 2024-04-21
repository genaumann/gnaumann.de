export const basePath = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.DEPLOY_URL
  ? 'https://gnaumann.de'
  : 'http://localhost:3000'
