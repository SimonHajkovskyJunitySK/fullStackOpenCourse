const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, openBlog } = require('./helper')

const BACKEND = 'http://localhost:3003'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${BACKEND}/api/testing/reset`)

    await request.post(`${BACKEND}/api/users`, {
      data: {
        name: 'Simon Hajkovsky',
        username: 'simon',
        password: 'salainen'
      }
    })

    await request.post(`${BACKEND}/api/users`, {
      data: {
        name: 'Juraj Novak',
        username: 'juraj',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'simon', 'salainen')

      await expect(page.getByText('Simon Hajkovsky logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'simon', 'wrong')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')

      await expect(
        page.getByText('Simon Hajkovsky logged in')
      ).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'simon', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'Testing with Playwright',
        'Kalle Ilves',
        'https://example.com/playwright'
      )

      await expect(
        page.getByRole('link', { name: 'Testing with Playwright' })
      ).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'Testing with Playwright',
          'Kalle Ilves',
          'https://example.com/playwright'
        )
      })

      test('the blog can be liked', async ({ page }) => {
        await openBlog(page, 'Testing with Playwright')

        await expect(page.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('the blog can be deleted by its creator', async ({ page }) => {
        await openBlog(page, 'Testing with Playwright')

        page.on('dialog', async dialog => {
          expect(dialog.type()).toBe('confirm')
          await dialog.accept()
        })

        await page.getByRole('button', { name: 'remove' }).click()

        await expect(
          page.getByText('blog Testing with Playwright removed')
        ).toBeVisible()
        await expect(
          page.getByRole('link', { name: 'Testing with Playwright' })
        ).not.toBeVisible()
      })
    })
  })
})