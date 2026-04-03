import { useState, useEffect } from 'react'
import api from '../api/axios'
import StoryCard from '../components/StoryCard'

export default function StoryFeed() {
  const [data, setData] = useState({ stories: [], total: 0, pages: 1 })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get(`/stories?page=${page}&limit=10`)
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [page])

  return (
    <main className="max-w-2xl mx-auto px-6 py-14">
      <div className="mb-12">
        <h1 className="font-playfair text-5xl font-bold text-gray-900 mb-3">Stories</h1>
        <p className="text-gray-400 text-sm">
          {data.total === 0 ? 'No stories yet' : `${data.total} ${data.total === 1 ? 'story' : 'stories'} published`}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : data.stories.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-playfair text-3xl text-gray-200 mb-3">No stories yet.</p>
          <p className="text-gray-400 text-sm">Be the first to write one.</p>
        </div>
      ) : (
        <>
          <div>
            {data.stories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
          {data.pages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: data.pages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-full text-sm transition-all ${
                    page === i + 1
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}