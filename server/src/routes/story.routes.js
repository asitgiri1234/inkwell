const router = require('express').Router()
const { getAll, getOne, create, remove, mine } = require('../controllers/story.controller')
const { protect } = require('../middleware/auth.middleware')
const { validate } = require('../middleware/validate.middleware')
const { z } = require('zod')

const createSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(120),
  content: z.string().min(50, 'Story must be at least 50 characters'),
  excerpt: z.string().min(10).max(300)
})

router.get('/', getAll)
router.get('/mine', protect, mine)
router.get('/:id', getOne)
router.post('/', protect, validate(createSchema), create)
router.delete('/:id', protect, remove)

module.exports = router