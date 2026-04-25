const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated. Please log in.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid or expired. Please log in again.' })
  }
}

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}

module.exports = { protect, requireAdmin }