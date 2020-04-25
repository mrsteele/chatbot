import ai from '../../utils/ai'

export default (req, res) => {
  ai(req.body.text, text => {
    res.json({ text })
  })
}
