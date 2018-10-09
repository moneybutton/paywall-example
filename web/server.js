require('dotenv').config()
const express = require('express')
const next = require('next')

/**
 * 
 */
const NODE_ENV = process.env.NODE_ENV
const WEB_PORT = process.env.WEB_PORT

/**
 * 
 */
async function start () {
  const app = next({ dev: NODE_ENV !== 'production' })
  const requestHandler = app.getRequestHandler()
  await app.prepare()
  const server = express()
  server.get('*', (req, res) => {
    return requestHandler(req, res)
  })
  server.listen(WEB_PORT, err => {
    if (err) {
      throw err
    }
    console.log(`> Ready on http://localhost:${WEB_PORT}`)
  })
}

if (require.main === module) {
  start()
}
