const storyService = require('../services/story.service')

const getAll = async (req, res, next) => {
  try {
    const { page, limit } = req.query
    const data = await storyService.getAllStories({ page, limit })
    res.json(data)
  } catch (err) {
    next(err)
  }
}

const getOne = async (req, res, next) => {
  try {
    const story = await storyService.getStoryById(req.params.id)
    res.json(story)
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const story = await storyService.createStory({
      ...req.body,
      authorId: req.user.id
    })
    res.status(201).json(story)
  } catch (err) {
    next(err)
  }
}

const remove = async (req, res, next) => {
  try {
    await storyService.deleteStory(req.params.id, req.user.id)
    res.json({ message: 'Story deleted' })
  } catch (err) {
    next(err)
  }
}

const mine = async (req, res, next) => {
  try {
    const stories = await storyService.getMyStories(req.user.id)
    res.json(stories)
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getOne, create, remove, mine }