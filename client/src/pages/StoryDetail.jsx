import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function StoryDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/stories/${id}`)
      .then(res => setStory(res.data))
      .catch(() => navigate('/stories'))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Delete this story? This cannot be undone.')) return
    try {
      await api.delete(`/stories/${id}`)
      navigate('/my-stories')
    } catch {
      alert('Failed to delete story.')
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!story) return null

  const date = new Date(story.createdAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })

  const readTime = Math.max(1, Math.ceil(story.content.length / 1000))

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <Link
        to="/stories"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-12"
      >
        ← All stories
      </Link>

      <article>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
          {story.title}
        </h1>

        <div className="flex items-center justify-between mb-10 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-medium">
                {story.author.username[0].toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{story.author.username}</p>
              <p className="text-xs text-gray-400">{date} · {readTime} min read</p>
            </div>
          </div>
          {user?.id === story.author.id && (
            <button
              onClick={handleDelete}
              className="text-xs text-gray-300 hover:text-red-400 transition-colors"
            >
              Delete
            </button>
          )}
        </div>

        <div className="space-y-5">
          {story.content.split('\n').map((para, i) =>
            para.trim() ? (
              <p key={i} className="text-gray-700 leading-[1.9] text-lg font-light">
                {para}
              </p>
            ) : null
          )}
        </div>
      </article>

      <div className="mt-16 pt-8 border-t border-gray-100">
        <Link
          to="/stories"
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          ← Back to all stories
        </Link>
      </div>
    </main>
  )
}