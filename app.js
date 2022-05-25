const express = require('express')
const path = require('path')
const fileUpload = require("express-fileupload")
const logger = require("morgan");
const mongoose = require('mongoose')

const app = express()

app.use(logger("dev"));
app.use(fileUpload({}))
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/games', require('./routes/games.routes'))
app.use('/api/goods', require('./routes/goods.routes'))

app.use('/', express.static(path.join(__dirname, 'client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
} )

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()

module.exports = app;