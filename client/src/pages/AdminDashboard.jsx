import { useEffect, useState } from 'react'
import api from '../api/axios'

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function formatDate(dateString) {
  const d = new Date(dateString)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [stories, setStories] = useState([])
  const [activeTab, setActiveTab] = useState('users')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')
      const [statsRes, usersRes, storiesRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
        api.get('/admin/stories')
      ])
      setStats(statsRes.data)
      setUsers(usersRes.data)
      setStories(storiesRes.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This will also delete all their stories.')) return
    try {
      await api.delete(`/admin/users/${id}`)
      setUsers(prev => prev.filter(u => u.id !== id))
      const statsRes = await api.get('/admin/stats')
      setStats(statsRes.data)
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete user')
    }
  }

  const handleDeleteStory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this story?')) return
    try {
      await api.delete(`/admin/stories/${id}`)
      setStories(prev => prev.filter(s => s.id !== id))
      const statsRes = await api.get('/admin/stats')
      setStats(statsRes.data)
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete story')
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-gray-400 text-sm">Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <StatCard label="Total Users" value={stats?.totalUsers ?? 0} />
        <StatCard label="Total Stories" value={stats?.totalStories ?? 0} />
        <StatCard label="Stories This Month" value={stats?.storiesThisMonth ?? 0} />
      </div>

      <div className="flex items-center gap-6 border-b border-gray-100 mb-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'users' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-900'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('stories')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'stories' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-900'
          }`}
        >
          Stories
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-400">
                <th className="pb-3 font-medium">Username</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Stories</th>
                <th className="pb-3 font-medium">Joined</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 text-gray-900 font-medium">{user.username}</td>
                  <td className="py-3 text-gray-500">{user.email}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      user.role === 'ADMIN' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500">{user.storyCount}</td>
                  <td className="py-3 text-gray-400">{formatDate(user.createdAt)}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'stories' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-400">
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Author</th>
                <th className="pb-3 font-medium">Excerpt</th>
                <th className="pb-3 font-medium">Created</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.map(story => (
                <tr key={story.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 text-gray-900 font-medium max-w-xs truncate">{story.title}</td>
                  <td className="py-3 text-gray-500">{story.author.username}</td>
                  <td className="py-3 text-gray-400 max-w-sm truncate">{story.excerpt}</td>
                  <td className="py-3 text-gray-400">{formatDate(story.createdAt)}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleDeleteStory(story.id)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {stories.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">No stories found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
