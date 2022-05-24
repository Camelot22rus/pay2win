const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  nickname: {type: String, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  goods: [{ type: Types.ObjectId, ref: 'Goods' }],
  registrationDate: {type: Date, default: Date.now},
  role: {type: String, default: 'COMMON_USER', required: true},
  nickName: {type: String}
})

module.exports = model('User', schema)
