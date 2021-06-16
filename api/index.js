require('dotenv').config()
const buildApi = require('./src/api')
const MockDatabase = require('./src/mock/database')

function start () {
  const app = buildApi(new MockDatabase())

  app.listen(3001, error => {
    if (error) throw error
    console.log(`Paywall backend ready on port: 3001`)
  })
}

start()
