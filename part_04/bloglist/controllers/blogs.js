const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'only the creator can delete a blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  request.user.blogs = request.user.blogs.filter(
    (b) => b.toString() !== request.params.id
  )
  await request.user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true }
    )
    .populate('user', { username: 1, name: 1 })

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter