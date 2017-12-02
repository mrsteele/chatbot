const apiai = require('apiai')

const app = apiai(process.env.APIAI_KEY)

module.exports = (message, onResponse) => {
  const request = app.textRequest(message, {
    sessionId: 'abc123'
  })

  request.on('response', (res) => {
    onResponse(res.result.fulfillment.speech)
    console.log(res)
  })

  request.on('error', (error) => {
    console.log('AI ERROR:', error)
    onResponse('An error occurred...')
  })

  request.end()
}
