import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/stories')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
            Welcome back.
          </h1>
          <p className="text-gray-400 text-sm">Sign in to continue your story.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-3 rounded-2xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </label>
            <input
              name="email" type="email" value={form.email}
              onChange={handle} required
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-gray-400 bg-white transition-colors placeholder-gray-300"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Password
            </label>
            <input
              name="password" type="password" value={form.password}
              onChange={handle} required
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-gray-400 bg-white transition-colors placeholder-gray-300"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full bg-gray-900 text-white py-3.5 rounded-2xl text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-40 mt-2"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          No account?{' '}
          <Link to="/register" className="text-gray-900 font-medium underline underline-offset-4">
            Create one free
          </Link>
        </p>
      </div>
    </main>
  )
}