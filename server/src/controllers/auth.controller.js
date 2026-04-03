const authService = require('../services/auth.service')

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
}

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body)
    res.status(201).json({ message: 'Account created successfully', user })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { token, user } = await authService.login(req.body)
    res.cookie('token', token, COOKIE_OPTIONS)
    res.json({ message: 'Logged in successfully', user })
  } catch (err) {
    next(err)
  }
}

const logout = (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS)
  res.json({ message: 'Logged out successfully' })
}

const me = (req, res) => {
  res.json({ user: req.user })
}

module.exports = { register, login, logout, me }