const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const register = async ({ email, username, password }) => {
  const existingEmail = await prisma.user.findUnique({ where: { email } })
  if (existingEmail) throw { status: 409, message: 'Email already in use' }

  const existingUsername = await prisma.user.findUnique({ where: { username } })
  if (existingUsername) throw { status: 409, message: 'Username already taken' }

  const hashed = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { email, username, password: hashed },
    select: { id: true, email: true, username: true, role: true, createdAt: true }
  })

  return user
}

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw { status: 401, message: 'Invalid email or password' }

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw { status: 401, message: 'Invalid email or password' }

  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )

  const { password: _, ...safeUser } = user
  return { token, user: safeUser }
}

module.exports = { register, login }