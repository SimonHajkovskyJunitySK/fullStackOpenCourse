# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog_app.spec.js >> Blog app >> When logged in >> and a blog exists >> the user who added the blog can delete it
- Location: tests\blog_app.spec.js:95:7

# Error details

```
Error: locator.click: Error: strict mode violation: locator('.blog').filter({ hasText: 'Testing with Playwright' }).getByRole('button', { name: 'view' }) resolved to 3 elements:
    1) <button>view</button> aka getByRole('button', { name: 'view' }).nth(2)
    2) <button>view</button> aka getByRole('button', { name: 'view' }).nth(3)
    3) <button>view</button> aka getByRole('button', { name: 'view' }).nth(4)

Call log:
  - waiting for locator('.blog').filter({ hasText: 'Testing with Playwright' }).getByRole('button', { name: 'view' })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "blogs" [level=2] [ref=e4]
  - generic [ref=e5]: a new blog Testing with Playwright by Kalle Ilves added
  - paragraph [ref=e6]:
    - text: Šimon Hajkovský logged in
    - button "logout" [ref=e7]
  - button "create new blog" [ref=e10]
  - generic [ref=e12]:
    - text: React patterns Michael Chan
    - button "view" [ref=e13]
  - generic [ref=e15]:
    - text: Go To Statement Considered Harmful Edsger W. Dijkstra
    - button "view" [ref=e16]
  - generic [ref=e18]:
    - text: Testing with Playwright Kalle Ilves
    - button "view" [ref=e19]
  - generic [ref=e21]:
    - text: Testing with Playwright Kalle Ilves
    - button "view" [ref=e22]
  - generic [ref=e24]:
    - text: Testing with Playwright Kalle Ilves
    - button "view" [ref=e25]
```

# Test source

```ts
  1   | const { test, expect, beforeEach, describe } = require('@playwright/test')
  2   | const { loginWith, createBlog, likeBlog } = require('./helper')
  3   | 
  4   | const BACKEND = 'http://localhost:3003'
  5   | 
  6   | describe('Blog app', () => {
  7   |   beforeEach(async ({ page, request }) => {
  8   |     await request.post(`${BACKEND}/api/testing/reset`)
  9   | 
  10  |     await request.post(`${BACKEND}/api/users`, {
  11  |       data: {
  12  |         name: 'Šimon Hajkovský',
  13  |         username: 'simon',
  14  |         password: 'salainen'
  15  |       }
  16  |     })
  17  | 
  18  |     await request.post(`${BACKEND}/api/users`, {
  19  |       data: {
  20  |         name: 'Juraj Novák',
  21  |         username: 'juraj',
  22  |         password: 'salainen'
  23  |       }
  24  |     })
  25  | 
  26  |     await page.goto('/')
  27  |   })
  28  | 
  29  |   test('Login form is shown', async ({ page }) => {
  30  |     await expect(page.getByText('Log in to application')).toBeVisible()
  31  |     await expect(page.getByTestId('username')).toBeVisible()
  32  |     await expect(page.getByTestId('password')).toBeVisible()
  33  |     await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  34  |   })
  35  | 
  36  |   describe('Login', () => {
  37  |     test('succeeds with correct credentials', async ({ page }) => {
  38  |       await loginWith(page, 'simon', 'salainen')
  39  | 
  40  |       await expect(page.getByText('Šimon Hajkovský logged in')).toBeVisible()
  41  |     })
  42  | 
  43  |     test('fails with wrong credentials', async ({ page }) => {
  44  |       await loginWith(page, 'simon', 'wrong')
  45  | 
  46  |       const errorDiv = page.locator('.error')
  47  |       await expect(errorDiv).toContainText('wrong username or password')
  48  | 
  49  |       await expect(
  50  |         page.getByText('Šimon Hajkovský logged in')
  51  |       ).not.toBeVisible()
  52  |     })
  53  |   })
  54  | 
  55  |   describe('When logged in', () => {
  56  |     beforeEach(async ({ page }) => {
  57  |       await loginWith(page, 'simon', 'salainen')
  58  |     })
  59  | 
  60  |     test('a new blog can be created', async ({ page }) => {
  61  |       await createBlog(
  62  |         page,
  63  |         'Testing with Playwright',
  64  |         'Kalle Ilves',
  65  |         'https://example.com/playwright'
  66  |       )
  67  | 
  68  |       await expect(
  69  |         page.locator('.blog', { hasText: 'Testing with Playwright' })
  70  |       ).toBeVisible()
  71  |     })
  72  | 
  73  |     describe('and a blog exists', () => {
  74  |       beforeEach(async ({ page }) => {
  75  |         await createBlog(
  76  |           page,
  77  |           'Testing with Playwright',
  78  |           'Kalle Ilves',
  79  |           'https://example.com/playwright'
  80  |         )
  81  |       })
  82  | 
  83  |       test('the blog can be liked', async ({ page }) => {
  84  |         const blogDiv = page.locator('.blog', {
  85  |           hasText: 'Testing with Playwright'
  86  |         })
  87  | 
  88  |         await blogDiv.getByRole('button', { name: 'view' }).click()
  89  |         await expect(blogDiv.getByText('likes 0')).toBeVisible()
  90  | 
  91  |         await blogDiv.getByRole('button', { name: 'like' }).click()
  92  |         await expect(blogDiv.getByText('likes 1')).toBeVisible()
  93  |       })
  94  | 
  95  |       test('the user who added the blog can delete it', async ({ page }) => {
  96  |         const blogDiv = page.locator('.blog', {
  97  |           hasText: 'Testing with Playwright'
  98  |         })
  99  | 
> 100 |         await blogDiv.getByRole('button', { name: 'view' }).click()
      |                                                             ^ Error: locator.click: Error: strict mode violation: locator('.blog').filter({ hasText: 'Testing with Playwright' }).getByRole('button', { name: 'view' }) resolved to 3 elements:
  101 | 
  102 |         page.on('dialog', async dialog => {
  103 |           expect(dialog.type()).toBe('confirm')
  104 |           await dialog.accept()
  105 |         })
  106 | 
  107 |         await blogDiv.getByRole('button', { name: 'remove' }).click()
  108 | 
  109 |         await expect(
  110 |           page.getByText('blog Testing with Playwright removed')
  111 |         ).toBeVisible()
  112 |         await expect(blogDiv).not.toBeVisible()
  113 |       })
  114 | 
  115 |       test('only the creator sees the delete button', async ({ page }) => {
  116 |         await page.getByRole('button', { name: 'logout' }).click()
  117 |         await loginWith(page, 'juraj', 'salainen')
  118 | 
  119 |         const blogDiv = page.locator('.blog', {
  120 |           hasText: 'Testing with Playwright'
  121 |         })
  122 | 
  123 |         await blogDiv.getByRole('button', { name: 'view' }).click()
  124 | 
  125 |         await expect(blogDiv.getByText('Šimon Hajkovský')).toBeVisible()
  126 |         await expect(
  127 |           blogDiv.getByRole('button', { name: 'remove' })
  128 |         ).not.toBeVisible()
  129 |       })
  130 |     })
  131 | 
  132 |     test('blogs are ordered by likes, most liked first', async ({ page }) => {
  133 |       await createBlog(page, 'The least liked', 'Author A', 'http://a.com')
  134 |       await createBlog(page, 'The middle one', 'Author B', 'http://b.com')
  135 |       await createBlog(page, 'The most liked', 'Author C', 'http://c.com')
  136 | 
  137 |       await likeBlog(page, 'The middle one', 1)
  138 |       await likeBlog(page, 'The most liked', 2)
  139 | 
  140 |       const blogs = page.locator('.blog')
  141 |       await expect(blogs).toHaveCount(3)
  142 | 
  143 |       await expect(blogs.nth(0)).toContainText('The most liked')
  144 |       await expect(blogs.nth(1)).toContainText('The middle one')
  145 |       await expect(blogs.nth(2)).toContainText('The least liked')
  146 |     })
  147 |   })
  148 | })
```