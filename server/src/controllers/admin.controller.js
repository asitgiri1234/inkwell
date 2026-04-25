const adminService = require('../services/admin.service')

const getStats = async (req, res, next) => {
  try {
    const stats = await adminService.getStats()
    res.json(stats)
  } catch (err) {
    next(err)
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers()
    res.json(users)
  } catch (err) {
    next(err)
  }
}

const removeUser = async (req, res, next) => {
  try {
    const result = await adminService.deleteUser(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

const getStories = async (req, res, next) => {
  try {
    const stories = await adminService.getAllStories()
    res.json(stories)
  } catch (err) {
    next(err)
  }
}

const removeStory = async (req, res, next) => {
  try {
    const result = await adminService.deleteStory(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

module.exports = { getStats, getUsers, removeUser, getStories, removeStory }
