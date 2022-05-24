const {Router} = require('express')
const config = require('config')
const Games = require('../models/Games')
const auth = require('../middleware/auth.middleware')
const Uuid = require('uuid')
const router = Router()

const ADMIN_ROLE = 'ADMIN'

router.post('/add', auth, async (req, res) => {
  try {
    const userRole = req.user.role

    if(userRole !== ADMIN_ROLE) {
      return res.status(401).json({message: 'У вас нет прав на это'})
    }

    const {title, categories} = req.body

    const image = req.files.file
    console.log(image)

    const imageName = Uuid.v4() + ".jpg"

    const existing = await Games.findOne({ title })

    image.mv(config.get('staticPath') + "\\" + imageName)

    if (existing) {
      const updated = await Games.findOneAndUpdate({title}, {categories, imageName}, {
        new: true
      });

      return res.status(201).json({ games: updated })
    }

    if(categories.length < 1 ) {
      return res.status(500).json({ message: 'Должна быть категория' })
    }

    const games = new Games({
      title, categories, imageName
    })

    await games.save()

    res.status(201).json({ games })
  } catch (e) {
    res.status(500).json({ message: `Test ${e}` })
  }
})

router.post('/remove', auth, async (req, res) => {
  try {
    const userRole = req.user.role

    if(userRole !== ADMIN_ROLE) {
      return res.status(401).json({message: 'У вас нет прав на это'})
    }
    const {id} = req.body
    const existing   = await Games.findOne({ _id: id })

    if (existing) {
        await Games.deleteOne({ _id: id });

        console.log(id)
        return res.status(201).json({ id: id })
    }

    return res.status(500).json({ message: 'Такой игры не найдено' })
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

router.get('/', async (req, res) => {
  try {
    const games = await Games.find({})
    res.json(games)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/categories', async (req, res) => {
  try {
    const Temp = Games.schema.path('categories').caster.enumValues;
    res.json(Temp)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const game = await Games.findById(req.params.id)
    res.json(game)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
