import { FeatureIcon } from "../components/Illustrations";

export default function About() {
  return (
    <div className="page narrow">
      <p className="eyebrow">About us</p>
      <h1 className="page-title">About Community Connect</h1>

      <div className="about-grid">
        <div className="about-card" style={{ background: "#eceaff" }}>
          <FeatureIcon kind="connect" color="#5b5bd6" />
          <h3>Why we built this</h3>
          <p>
            Community Connect was created for the PAREK community across India:
            Chartered Accountants, Civil Engineers and people from many other
            professions. Finding someone from your own community in a new city,
            a new company or a new career should not be hard.
          </p>
        </div>
        <div className="about-card" style={{ background: "#ffe9dc" }}>
          <FeatureIcon kind="pin" color="#ff7a3d" />
          <h3>What you can do</h3>
          <p>
            Create a profile, add your company, locality and contact details,
            and search or browse every member by name, profession, locality or
            company. Click any member to see their full profile.
          </p>
        </div>
      </div>

      <div className="motto">
        <span>Our motto</span>
        <strong>Connecting the community with each other.</strong>
      </div>
    </div>
  );
}
