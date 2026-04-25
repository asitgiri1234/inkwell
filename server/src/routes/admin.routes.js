const router = require('express').Router()
const { protect, requireAdmin } = require('../middleware/auth.middleware')
const {
  getStats,
  getUsers,
  removeUser,
  getStories,
  removeStory
} = require('../controllers/admin.controller')

router.get('/stats', protect, requireAdmin, getStats)
router.get('/users', protect, requireAdmin, getUsers)
router.delete('/users/:id', protect, requireAdmin, removeUser)
router.get('/stories', protect, requireAdmin, getStories)
router.delete('/stories/:id', protect, requireAdmin, removeStory)

module.exports = router
