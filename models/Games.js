const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true, unique: true},
    categories: [{type: String, enum: ['Валюта', 'Аккаунты', 'Предметы', 'Другое'], required: true}],
    imageName: {type: String, required: true}
})

module.exports = model('Games', schema)
