import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`border-b border-gray-100 bg-[#FAFAF8]/90 backdrop-blur-sm sticky top-0 z-50 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-playfair text-2xl font-bold text-gray-900 tracking-tight">
          Inkwell
        </Link>

        <div className="flex items-center gap-7">
          <Link
            to="/stories"
            className={`text-sm transition-colors ${
              isActive('/stories')
                ? 'text-gray-900 font-medium'
                : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            Read
          </Link>

          {user ? (
            <>
              <Link
                to="/write"
                className={`text-sm transition-colors ${
                  isActive('/write')
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                Write
              </Link>
              <Link
                to="/my-stories"
                className={`text-sm transition-colors ${
                  isActive('/my-stories')
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                My Stories
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`text-sm transition-colors ${
                    isActive('/admin')
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-sm bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-sm bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}