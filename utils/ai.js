import apiai from 'apiai'

const app = apiai(process.env.APIAI_KEY)

export default (message, onResponse) => {
  const request = app.textRequest(message, {
    sessionId: 'abc123'
  })

  request.on('response', (res) => {
    onResponse(res.result.fulfillment.speech)
  })

  request.on('error', (error) => {
    console.log('AI ERROR:', error)
    onResponse('An error occurred...')
  })

  request.end()
}
