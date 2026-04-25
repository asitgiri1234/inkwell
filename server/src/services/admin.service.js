const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getStats = async () => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [totalUsers, totalStories, storiesThisMonth] = await Promise.all([
    prisma.user.count(),
    prisma.story.count(),
    prisma.story.count({
      where: { createdAt: { gte: startOfMonth } }
    })
  ])

  return { totalUsers, totalStories, storiesThisMonth }
}

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { stories: true } }
    }
  })

  return users.map(u => ({
    id: u.id,
    email: u.email,
    username: u.username,
    role: u.role,
    createdAt: u.createdAt,
    storyCount: u._count.stories
  }))
}

const deleteUser = async (id) => {
  await prisma.user.delete({ where: { id } })
  return { message: 'User deleted' }
}

const getAllStories = async () => {
  const stories = await prisma.story.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: { id: true, username: true, email: true }
      }
    }
  })
  return stories
}

const deleteStory = async (id) => {
  await prisma.story.delete({ where: { id } })
  return { message: 'Story deleted' }
}

module.exports = {
  getStats,
  getAllUsers,
  deleteUser,
  getAllStories,
  deleteStory
}
