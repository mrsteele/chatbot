const express = require('express')
const next = require('next')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const ai = require('./utils/ai')

const nextApp = next({dev: process.env.NODE_ENV !== 'production'})
const port = process.env.PORT || '3000'

const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  // middleware
  app.set('json spaces', 2)
  app.use(bodyParser.json())
  app.use(cookieParser())

  app.post('/chat', (req, res, next) => {
    ai(req.body.text, text => {
      res.json({ text })
    })
  })

  app.get('*', handle)

  app.listen(port)

  console.log(`Listening at http://localhost:${port}`)
})
