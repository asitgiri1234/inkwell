const router = require('express').Router()
const { register, login, logout, me } = require('../controllers/auth.controller')
const { protect } = require('../middleware/auth.middleware')
const { validate } = require('../middleware/validate.middleware')
const { z } = require('zod')

const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(20),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required')
})

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/logout', protect, logout)
router.get('/me', protect, me)

module.exports = router