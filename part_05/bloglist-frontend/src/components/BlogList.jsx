import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => (
  <div>
    <h2>blogs</h2>
    {[...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <div key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      )}
  </div>
)

export default BlogList