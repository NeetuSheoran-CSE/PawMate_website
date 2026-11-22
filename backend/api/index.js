import { createApp } from '../src/app.js'
import { connectDb } from '../src/db.js'

const app = createApp()

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
