# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog_app.spec.js >> Blog app >> When logged in >> blogs are ordered by likes, most liked first
- Location: tests\blog_app.spec.js:132:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.blog')
Expected: 3
Received: 9
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('.blog')
    14 × locator resolved to 9 elements
       - unexpected value "9"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "blogs" [level=2] [ref=e4]
  - paragraph [ref=e5]:
    - text: Šimon Hajkovský logged in
    - button "logout" [ref=e6]
  - button "create new blog" [ref=e9]
  - generic [ref=e11]:
    - text: React patterns Michael Chan
    - button "view" [ref=e12]
  - generic [ref=e14]:
    - text: Go To Statement Considered Harmful Edsger W. Dijkstra
    - button "view" [ref=e15]
  - generic [ref=e16]:
    - generic [ref=e17]:
      - text: The most liked Author C
      - button "hide" [ref=e18]
    - generic [ref=e19]:
      - generic [ref=e20]: http://c.com
      - generic [ref=e21]:
        - text: likes 2
        - button "like" [active] [ref=e22]
      - generic [ref=e23]: Šimon Hajkovský
      - button "remove" [ref=e24]
  - generic [ref=e25]:
    - generic [ref=e26]:
      - text: The middle one Author B
      - button "hide" [ref=e27]
    - generic [ref=e28]:
      - generic [ref=e29]: http://b.com
      - generic [ref=e30]:
        - text: likes 1
        - button "like" [ref=e31]
      - generic [ref=e32]: Šimon Hajkovský
      - button "remove" [ref=e33]
  - generic [ref=e35]:
    - text: Testing with Playwright Kalle Ilves
    - button "view" [ref=e36]
  - generic [ref=e38]:
    - text: Testing with Playwright Kalle Ilves
    - button "view" [ref=e39]
  - generic [ref=e41]:
    - text: Testing with Playwright Kalle Ilves
    - button "view" [ref=e42]
  - generic [ref=e44]:
    - text: Testing with Playwright Kalle Ilves
    - button "view" [ref=e45]
  - generic [ref=e47]:
    - text: The least liked Author A
    - button "view" [ref=e48]
```

# Test source

```ts
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
  100 |         await blogDiv.getByRole('button', { name: 'view' }).click()
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
> 141 |       await expect(blogs).toHaveCount(3)
      |                           ^ Error: expect(locator).toHaveCount(expected) failed
  142 | 
  143 |       await expect(blogs.nth(0)).toContainText('The most liked')
  144 |       await expect(blogs.nth(1)).toContainText('The middle one')
  145 |       await expect(blogs.nth(2)).toContainText('The least liked')
  146 |     })
  147 |   })
  148 | })
```