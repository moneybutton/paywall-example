const cors = require('cors')
const uuid = require('uuid')
const express = require('express')

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

function buildApi (db) {
  const app = express()
  app.use(express.json())
  app.use(cors({ origin: true }))

  app.post('/session', async ({ body }, res) => {
    res.json(db.createSession(body.userId))
  })

  app.post('/webhook', function (req, res) {
    const { secret, payment } = req.body

    if (secret !== WEBHOOK_SECRET) {
      res.status(400).send('Wrong webhook secret.')
    }

    try {
      const { buttonData } = payment
      const { userId, postId } = JSON.parse(buttonData)

      db.updatePurchase(userId, postId)
    } catch (error) {
      console.log('data parsing error')
    }
    res.json({})
  })

  app.use((req, res, next) => {
    const session = db.getSession(req.headers.authorization)

    if (!session) {
      res.status(401).send()
    } else {
      req.session = session
      next()
    }
  })

  app.post('/posts', ({ body }, res) => {
    res.json(db.createPost(body))
  })

  app.get('/posts', ({ session }, res) => {
    res.json(db.getPosts(session.userId))
  })

  app.post('/purchases', ({ body }, res) => {
    db.createPurchase(body.userId, body.postId)
    res.json({})
  })

  return app
}

module.exports = buildApi
