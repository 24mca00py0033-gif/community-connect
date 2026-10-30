import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import ProfileCard from "../components/ProfileCard";
import { HeroArt, ListArt, FeatureIcon } from "../components/Illustrations";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users/featured")
      .then((res) => setPeople(res.data.users))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Welcome back, {user.name}</p>
          <h1>
            Bring your <span className="hl">community</span> together
          </h1>
          <p className="lead">
            Community Connect helps the Pareek community's Chartered
            Accountants, Company Secretaries and Cost &amp; Management
            Accountants find each other by company, profession and locality.
          </p>
          <div className="hero-actions">
            <Link to="/search" className="btn">Find people</Link>
            <Link to="/members" className="btn btn-outline">Browse members</Link>
          </div>
        </div>
        <HeroArt />
      </section>

      {/* ---------- Features ---------- */}
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">What you can do</p>
          <h2>Everything you need to stay connected</h2>
        </div>
        <div className="feature-grid">
          <div className="feature" style={{ background: "#eceaff" }}>
            <FeatureIcon kind="pin" color="#5b5bd6" />
            <h3>Find your locality</h3>
            <p>See who lives and works near you and meet people from your own neighbourhood.</p>
          </div>
          <div className="feature" style={{ background: "#ffe9dc" }}>
            <FeatureIcon kind="career" color="#ff7a3d" />
            <h3>Find your career</h3>
            <p>Search by profession and company to grow your professional network.</p>
          </div>
          <div className="feature" style={{ background: "#dff5e9" }}>
            <FeatureIcon kind="connect" color="#2f9e63" />
            <h3>Stay connected</h3>
            <p>Share your profile so the community can reach you any time.</p>
          </div>
        </div>
      </section>

      {/* ---------- Blue band ---------- */}
      <section className="band">
        <div className="band-text">
          <p className="band-eyebrow">Explore</p>
          <h2>One place to discover the people you didn't know you needed</h2>
          <p>
            Look people up by name, last name, profession, locality or company.
            Open any profile to see their full details and get in touch.
          </p>
          <Link to="/search" className="btn btn-white">Search the community</Link>
        </div>
        <ListArt />
      </section>

      {/* ---------- 10 profiles ---------- */}
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Our members</p>
          <h2>Meet some of the community</h2>
        </div>
        {loading ? (
          <p className="center-msg">Loading profiles...</p>
        ) : people.length === 0 ? (
          <p className="center-msg">No members yet. Be the first to complete your profile!</p>
        ) : (
          <div className="grid-cards">
            {people.map((p) => (
              <ProfileCard key={p._id} person={p} />
            ))}
          </div>
        )}
        <div className="center-btn">
          <Link to="/members" className="btn btn-outline">View all members</Link>
        </div>
      </section>

      {/* ---------- Call to action ---------- */}
      <section className="cta">
        <div>
          <h2>Let your community find you</h2>
          <p>Add your company, locality and a photo so people can reach you.</p>
        </div>
        <Link to="/profile" className="btn">Complete my profile</Link>
      </section>
    </>
  );
}
