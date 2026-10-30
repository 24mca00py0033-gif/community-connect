import { Link } from "react-router-dom";
import { BrandMark } from "./Illustrations";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-about">
          <div className="brand brand-light">
            <BrandMark /> Community Connect
          </div>
          <p>
            Connecting the community with each other. Built for the PAREK
            community: CAs, CEs and professionals from every field.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/members">Members</Link>
        </div>

        <div>
          <h4>Account</h4>
          <Link to="/profile">My profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div>
          <h4>Community</h4>
          <Link to="/about">About us</Link>
          <span>Find people by locality</span>
          <span>Find people by career</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Community Connect. All rights reserved.</span>
        <span>Made with care for the PAREK community</span>
      </div>
    </footer>
  );
}
