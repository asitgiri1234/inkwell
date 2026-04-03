const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getAllStories = async ({ page = 1, limit = 10 } = {}) => {
  const skip = (page - 1) * limit
  const [stories, total] = await Promise.all([
    prisma.story.findMany({
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, username: true } }
      }
    }),
    prisma.story.count()
  ])
  return { stories, total, page: Number(page), pages: Math.ceil(total / limit) }
}

const getStoryById = async (id) => {
  const story = await prisma.story.findUnique({
    where: { id },
    include: { author: { select: { id: true, username: true } } }
  })
  if (!story) throw { status: 404, message: 'Story not found' }
  return story
}

const createStory = async ({ title, content, excerpt, authorId }) => {
  return prisma.story.create({
    data: { title, content, excerpt, authorId },
    include: { author: { select: { id: true, username: true } } }
  })
}

const deleteStory = async (id, userId) => {
  const story = await prisma.story.findUnique({ where: { id } })
  if (!story) throw { status: 404, message: 'Story not found' }
  if (story.authorId !== userId) throw { status: 403, message: 'Not allowed to delete this story' }
  await prisma.story.delete({ where: { id } })
}

const getMyStories = async (userId) => {
  return prisma.story.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { id: true, username: true } } }
  })
}

module.exports = { getAllStories, getStoryById, createStory, deleteStory, getMyStories }