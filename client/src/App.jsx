import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import StoryFeed from './pages/StoryFeed'
import StoryDetail from './pages/StoryDetail'
import CreateStory from './pages/CreateStory'
import MyStories from './pages/MyStories'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<StoryFeed />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={
          <ProtectedRoute><CreateStory /></ProtectedRoute>
        } />
        <Route path="/my-stories" element={
          <ProtectedRoute><MyStories /></ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}