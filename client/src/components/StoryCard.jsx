import { Link } from 'react-router-dom'

export default function StoryCard({ story }) {
  const date = new Date(story.createdAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })

  const readTime = Math.max(1, Math.ceil(story.content.length / 1000))

  return (
    <Link to={`/stories/${story.id}`} className="block group">
      <article className="py-8 border-b border-gray-100 group-hover:border-gray-300 transition-colors">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-medium">
              {story.author.username[0].toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-gray-700 font-medium">{story.author.username}</span>
          <span className="text-gray-200">·</span>
          <span className="text-sm text-gray-400">{date}</span>
          <span className="text-gray-200">·</span>
          <span className="text-sm text-gray-400">{readTime} min read</span>
        </div>

        <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors leading-snug">
          {story.title}
        </h2>
        <p className="text-gray-500 text-base leading-relaxed line-clamp-2 font-light">
          {story.excerpt}
        </p>
      </article>
    </Link>
  )
}