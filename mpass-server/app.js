const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3000
const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/login' , Controller.login)
app.post('/reqToken' , Controller.reqToken)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})