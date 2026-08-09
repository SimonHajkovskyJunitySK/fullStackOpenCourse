const { expect } = require('@playwright/test')

const loginWith = async (page, username, password) => {
  await page.getByRole('link', { name: 'login' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('link', { name: 'create new' }).click()
  await page.getByPlaceholder('title').fill(title)
  await page.getByPlaceholder('author').fill(author)
  await page.getByPlaceholder('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()

  await expect(
    page.getByText(`a new blog ${title} by ${author} added`)
  ).toBeVisible()
}

const openBlog = async (page, title) => {
  await page.getByRole('link', { name: title }).click()
  await expect(page.getByRole('heading', { name: title })).toBeVisible()
}

module.exports = { loginWith, createBlog, openBlog }