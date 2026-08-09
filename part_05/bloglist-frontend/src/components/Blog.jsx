const Blog = ({ blog, user, likeBlog, removeBlog }) => {
  if (!blog) {
    return null
  }

  const own = user && blog.user && blog.user.username === user.username

  return (
    <div className="blog blog-single">
      <h2>{blog.title}</h2>
      <div className="blog-author">{blog.author}</div>

      <a className="blog-url" href={blog.url}>{blog.url}</a>

      <div className="blog-likes">
        <span className="count">likes {blog.likes}</span>
        {user && (
          <button onClick={() => likeBlog(blog)}>like</button>
        )}
      </div>

      <div className="blog-added-by">
        added by {blog.user ? blog.user.name : ''}
      </div>

      {own && (
        <button className="danger" onClick={() => removeBlog(blog)}>
          remove
        </button>
      )}
    </div>
  )
}

export default Blog