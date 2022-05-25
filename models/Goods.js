const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  title: {type: String, required: true},
  quantity: {type: Number, required: true},
  price: {type: Number, required: true},
  game: {type: Types.ObjectId, ref: 'Games'},
  category: {type: String, required: true},
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Goods', schema)
