const LoginForm = ({
  handleSubmit, username, password, setUsername, setPassword
}) => (
    <div className="form-card">
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">username</label>
          <input
            id="username"
            data-testid="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">password</label>
          <input
            id="password"
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

export default LoginForm