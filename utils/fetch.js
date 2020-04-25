import fetchPonyfill from 'fetch-ponyfill'
const { fetch } = fetchPonyfill()

const env = {
  DOMAIN: ''
}

const ajax = {}

const settings = (cookies) => {
  const ret = {
    credentials: 'true',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (cookies) {
    ret.headers.cookie = Object.keys(cookies).map(key => `${key}=${cookies[key]}`).join('; ')
  }

  return ret
}

ajax.get = (url, method = 'GET', cookies = null) => fetch(`${env.DOMAIN}${url}`, {
  method,
  ...settings(cookies)
}).then(res => res.json())

ajax.post = (url, data, method = 'POST', cookies = null) => fetch(`${env.DOMAIN}${url}`, {
  method,
  body: JSON.stringify(data),
  ...settings(cookies)
}).then(res => res.json())

ajax.put = (url, data) => ajax.post(url, data, 'PUT')
ajax.delete = (url) => ajax.get(url, 'DELETE')

export default ajax
