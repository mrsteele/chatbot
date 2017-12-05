import Head from 'next/head'
import { Component } from 'react'
import ajax from '../utils/fetch'

export default class extends Component {
  static async getInitialProps ({ req }) {
    return {}
  }

  constructor (props) {
    super(props)

    this.state = { msgs: [] }

    this.submitTextarea = this.submitTextarea.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  submitTextarea (e) {
    e.preventDefault()
    ajax.post('/chat', {
      text: this.state.textarea
    }).then(({ text }) => {
      this.addMessage({
        author: 'Matbot',
        text
      })
    })
    this.addMessage({
      author: 'You',
      text: this.state.textarea
    })
    this.setState({
      textarea: ''
    })
  }

  addMessage (msg) {
    this.setState({
      msgs: [msg].concat(this.state.msgs)
    })
  }

  handleChange (e) {
    this.setState({
      textarea: e.target.value
    })
  }

  render () {
    const { textarea, msgs } = this.state

    const Msgs = msgs.map(msg => <div className={msg.author}>{msg.text}</div>)
    return (
      <main>
        <Head>
          <title>A chatbot by mrsteele</title>
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        </Head>
        <form className='typearea' onSubmit={this.submitTextarea}>
          <input type='text' value={textarea} onChange={this.handleChange} placeholder='chat here' />
          <button type='button' onClick={this.submitTextarea}>Submit</button>
        </form>
        <div className='msgs'>
          {Msgs}
        </div>
        <footer>
          A chatbot made by <a href='https://github.com/mrsteele/chatbot' target='_blank'>mrsteele</a>
        </footer>
        <style global>{`
            body {
              padding: 0;
              margin: 0;
              min-height: 100vh;
              background: #f2f2f2;
              font-family: Helvatica, Arial, "sans-serif";
            }
        `}</style>
        <style jsx>{`
          * {
            font-size: 2vw;
          }

          input {
            box-sizing: border-box;
            width: 100%;
            resize: vertical;
            outline: none;
            padding: 10px;
          }

          button {
            border: none;
            color: #f2f2f2;
            background: #0000aa;
            border-radius: 0;
            cursor: pointer;
            outline: none;
            padding: 1px 15px;
          }

          button:hover {
            opacity: 0.8;
          }

          .typearea {
            display: flex;
          }

          footer {
            position: absolute;
            right: 0;
            bottom: 0;
            opacity: 0.5;
            font-size: 0.75em;
            padding: 0.5em;
          }

          footer * {
            font-size: inherit;
          }

          .msgs {
            padding: 10px;
          }

          .msgs > :global(div) {
            margin-bottom: 0.3em;
          }

          .msgs > :global(div.You):before {
            content: 'You: ';
            color: blue;
          }

          .msgs > :global(div.Matbot):before {
            content: 'Matbot: ';
            color: red;
          }
        `}</style>
      </main>
    )
  }
}
