import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar, { fullName } from "./Avatar";
import { BrandMark } from "./Illustrations";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <BrandMark /> Community Connect
        <span className="beta-badge">Beta</span>
      </Link>

      {user ? (
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/members">Members</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/profile" className="nav-me">
            <Avatar src={user.profilePic} name={fullName(user)} size={32} />
            <span>My Profile</span>
          </NavLink>
          <button className="btn btn-outline btn-small" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      ) : (
        <nav className="nav-links">
          <NavLink to="/login">Login</NavLink>
          <Link to="/register" className="btn btn-outline btn-small">Sign up</Link>
        </nav>
      )}
    </header>
  );
}
