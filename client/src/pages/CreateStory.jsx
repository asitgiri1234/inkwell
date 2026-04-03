import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function CreateStory() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', excerpt: '', content: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/stories', form)
      navigate(`/stories/${res.data.id}`)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const wordCount = form.content.trim()
    ? form.content.trim().split(/\s+/).length
    : 0

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-1">Write a story</h1>
        <p className="text-gray-400 text-sm">Share something worth reading.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-3 rounded-2xl mb-8">
          {error}
        </div>
      )}

      <form onSubmit={submit}>
        <div className="border-b border-gray-100 pb-6 mb-6">
          <input
            name="title"
            value={form.title}
            onChange={handle}
            required
            placeholder="Your story title"
            className="w-full font-playfair text-4xl font-bold text-gray-900 bg-transparent border-none outline-none placeholder-gray-200 leading-tight"
          />
        </div>

        <div className="border-b border-gray-100 pb-6 mb-6">
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handle}
            required
            placeholder="Write a short excerpt — one or two lines to draw readers in..."
            rows={2}
            className="w-full text-gray-500 bg-transparent border-none outline-none placeholder-gray-200 resize-none text-base leading-relaxed"
          />
        </div>

        <div className="mb-8">
          <textarea
            name="content"
            value={form.content}
            onChange={handle}
            required
            placeholder="Tell your story..."
            rows={22}
            className="w-full text-gray-700 bg-transparent border-none outline-none placeholder-gray-200 resize-none text-lg leading-[1.9] font-light"
          />
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-gray-100">
          <span className="text-xs text-gray-300">
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-gray-700 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          >
            {loading ? 'Publishing...' : 'Publish story'}
          </button>
        </div>
      </form>
    </main>
  )
}