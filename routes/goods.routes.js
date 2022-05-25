const {Router} = require('express')
const Goods = require('../models/Goods')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/add', auth, async (req, res) => {
  try {
    const {title, quantity, price, game, category} = req.body

    const goods = new Goods({
      title, quantity, price, game, category, owner: req.user.userId
    })

    await goods.save()

    res.status(201).json({ goods, message: 'Выше предложение о продаже добавлено' })
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так, попробуйте снова, ${e}` })
  }
})

router.get('/game/:id', auth, async (req, res) => {
  try {
    const goods = await Goods.find({ game: req.params.id })
    res.json(goods)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
