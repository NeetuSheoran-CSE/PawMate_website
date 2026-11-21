import { createApp } from '../backend/src/app.js'
import { connectDb } from '../backend/src/db.js'

const app = createApp()

// serverless instances are ephemeral: connect once per warm instance and reuse
let dbPromise = null
const dbReady = () => {
  if (!dbPromise) {
    dbPromise = connectDb().catch((err) => {
      dbPromise = null
      throw err
    })
  }
  return dbPromise
}

export default async function handler(req, res) {
  await dbReady()
  return app(req, res)
}
