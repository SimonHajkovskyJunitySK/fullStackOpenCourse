import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom'
import Menu from './components/Menu'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const notify = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      notify(`welcome ${loggedUser.name}`)
      navigate('/')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    navigate('/')
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat({
        ...returnedBlog,
        user: {
          username: user.username,
          name: user.name,
          id: user.id
        }
      }))
      notify(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      navigate('/')
    } catch (exception) {
      notify(
        exception.response?.data?.error || 'failed to create blog',
        'error'
      )
    }
  }

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user ? blog.user.id : null
      })

      setBlogs(blogs.map(b =>
        b.id !== blog.id
          ? b
          : { ...updatedBlog, user: blog.user }
      ))
    } catch (exception) {
      notify(
        exception.response?.data?.error || 'failed to update blog',
        'error'
      )
    }
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (!ok) {
      return
    }

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      notify(`blog ${blog.title} removed`)
      navigate('/')
    } catch (exception) {
      notify(
        exception.response?.data?.error || 'failed to remove blog',
        'error'
      )
    }
  }

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  return (
    <div>
      <Menu user={user} handleLogout={handleLogout} />
      <Notification message={message} />

      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route path="/login" element={<LoginForm login={handleLogin} />} />
        <Route path="/create" element={<BlogForm createBlog={addBlog} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              user={user}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App