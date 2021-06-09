require('dotenv').config()
const buildApi = require('./src/api')
const MockDatabase = require('./src/mock/database')

const API_PORT = process.env.API_PORT

function start () {
  const app = buildApi(new MockDatabase())

  app.listen(API_PORT, error => {
    if (error) throw error
    console.log(`Ready on port: ${API_PORT}`)
  })
}

start()
