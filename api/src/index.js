const buildApp = require('./app')
const Database = require('./database')

function start () {
  const db = new Database()
  const app = buildApp(db)
  app.listen(9001, () => {
    console.log('Listening on port 9001.')
  })
}

if (require.main === module) {
  start()
}
