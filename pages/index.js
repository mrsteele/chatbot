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

  submitTextarea () {
    ajax.post('/chat', {
      text: this.state.textarea
    }).then(({ text }) => {
      this.addMessage({
        author: 'Skynet',
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
      msgs: this.state.msgs.concat(msg)
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
        <div className='typearea'>
          <textarea value={textarea} onChange={this.handleChange} placeholder='chat here' />
          <button type='button' onClick={this.submitTextarea}>Submit</button>
        </div>
        <div className='msgs'>
          {Msgs}
        </div>
        <style jsx>{`
          main {
            box-sizing: border-box;
            max-width: 800px;
            width: 100%;
            margin: auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            min-height: 75vh;
            padding: 10px;
          }

          textarea {
            box-sizing: border-box;
            width: 100%;
            resize: vertical;
            outline: none;
          }

          button {
            border: none;
            color: white;
            background: blue;
            border-radius: 0;
            cursor: pointer;
            outline: none;
          }

          button:hover {
            opacity: 0.8;
          }

          .typearea {
            display: flex;
          }

          .msgs {
            margin-top: 10px;
            color: white;
            background: #222;
            padding: 10px;
          }

          .msgs > :global(div) {
            margin-bottom: 0.3em;
          }

          .msgs > :global(div.You):before {
            content: 'You: ';
            color: green;
          }

          .msgs > :global(div.Skynet):before {
            content: 'Skynet: ';
            color: red;
          }
        `}</style>
      </main>
    )
  }
}
