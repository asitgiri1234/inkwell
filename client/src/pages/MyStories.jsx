import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function MyStories() {
  const { user } = useAuth()
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/stories/mine')
      .then(res => setStories(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this story? This cannot be undone.')) return
    try {
      await api.delete(`/stories/${id}`)
      setStories(prev => prev.filter(s => s.id !== id))
    } catch {
      alert('Failed to delete.')
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-14">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="font-playfair text-5xl font-bold text-gray-900 mb-2">Your stories</h1>
          <p className="text-gray-400 text-sm">Welcome back, {user?.username}</p>
        </div>
        <Link
          to="/write"
          className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-all hover:scale-105"
        >
          Write new
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-playfair text-3xl text-gray-200 mb-3">Nothing here yet.</p>
          <Link
            to="/write"
            className="text-sm text-gray-400 hover:text-gray-700 underline underline-offset-4 transition-colors"
          >
            Write your first story
          </Link>
        </div>
      ) : (
        <div>
          {stories.map(story => {
            const date = new Date(story.createdAt).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric'
            })
            const wordCount = story.content.trim().split(/\s+/).length

            return (
              <div
                key={story.id}
                className="py-7 border-b border-gray-100 flex items-start justify-between gap-6 group"
              >
                <div className="flex-1 min-w-0">
                  <Link to={`/stories/${story.id}`}>
                    <h2 className="font-playfair text-xl font-bold text-gray-900 group-hover:text-gray-500 transition-colors mb-1.5 leading-snug">
                      {story.title}
                    </h2>
                  </Link>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-1 mb-2 font-light">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-300">
                    <span>{date}</span>
                    <span>·</span>
                    <span>{wordCount} words</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(story.id)}
                  className="text-xs text-gray-300 hover:text-red-400 transition-colors shrink-0 pt-1"
                >
                  Delete
                </button>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}