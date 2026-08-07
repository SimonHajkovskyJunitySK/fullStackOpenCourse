const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const reducer = (best, item) => {
    return item.likes > best.likes
      ? item
      : best
  }

  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const counts = {}
  blogs.forEach((blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
  })

  const topAuthor = Object.keys(counts).reduce((best, author) =>
    counts[author] > counts[best] ? author : best
  )

  return {
    author: topAuthor,
    blogs: counts[topAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesByAuthor = {}
  blogs.forEach((blog) => {
    likesByAuthor[blog.author] = (likesByAuthor[blog.author] || 0) + blog.likes
  })

  const topAuthor = Object.keys(likesByAuthor).reduce((best, author) =>
    likesByAuthor[author] > likesByAuthor[best] ? author : best
  )

  return {
    author: topAuthor,
    likes: likesByAuthor[topAuthor]
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}