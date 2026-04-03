import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Home() {
  const { user } = useAuth()
  const [count, setCount] = useState(0)

  useEffect(() => {
    api.get('/stories?limit=1')
      .then(res => setCount(res.data.total))
      .catch(() => {})
  }, [])

  return (
    <main className="max-w-5xl mx-auto px-6">
      <section className="py-28 md:py-40">
        <p className="text-sm text-gray-400 tracking-widest uppercase mb-6">
          {count > 0 ? `${count} stories and counting` : 'A place for stories'}
        </p>
        <h1 className="font-playfair text-6xl md:text-8xl font-bold text-gray-900 leading-[1.05] mb-8">
          Where stories<br />
          <em className="text-gray-300 not-italic">come alive.</em>
        </h1>
        <p className="text-lg text-gray-500 max-w-lg mb-12 leading-relaxed font-light">
          A quiet place to write, share, and discover stories that matter.
          No noise. No distractions. Just words.
        </p>
        <div className="flex items-center gap-5">
          <Link
            to="/stories"
            className="bg-gray-900 text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-all hover:scale-105"
          >
            Start reading
          </Link>
          {!user ? (
            <Link
              to="/register"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              Start writing for free →
            </Link>
          ) : (
            <Link
              to="/write"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              Write something →
            </Link>
          )}
        </div>
      </section>

      <section className="border-t border-gray-100 py-16 grid grid-cols-3 gap-8">
        {[
          { label: 'Write', desc: 'A distraction-free editor built for focus and flow.' },
          { label: 'Publish', desc: 'Share your stories with readers instantly.' },
          { label: 'Discover', desc: 'Read stories from writers around the world.' },
        ].map(item => (
          <div key={item.label}>
            <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">{item.label}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}