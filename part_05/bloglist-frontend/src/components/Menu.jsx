import { Link } from 'react-router-dom'

const Menu = ({ user, handleLogout }) => (
  <nav className="nav">
    <Link to="/">blogs</Link>
    {user
      ? <>
        <Link to="/create">create new</Link>
        <span className="nav-spacer nav-user">{user.name} logged in</span>
        <button className="secondary" onClick={handleLogout}>logout</button>
      </>
      : <Link className="nav-spacer" to="/login">login</Link>
    }
  </nav>
)

export default Menu