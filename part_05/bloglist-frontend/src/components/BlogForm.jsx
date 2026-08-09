import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="form-card">
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">title</label>
          <input
            id="title"
            value={title}
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="author">author</label>
          <input
            id="author"
            value={author}
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="url">url</label>
          <input
            id="url"
            value={url}
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm