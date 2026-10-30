import { FeatureIcon } from "../components/Illustrations";

const roles = [
  { short: "CA", full: "Chartered Accountant", bg: "#dff5e9", fg: "#1f7a4d" },
  { short: "CS", full: "Company Secretary", bg: "#eceaff", fg: "#4338ca" },
  { short: "CMA", full: "Cost & Management Accountant", bg: "#ffe9dc", fg: "#c2410c" },
];

const steps = [
  { n: "1", title: "Create your profile", text: "Register, then add your profession, company, locality and a photo." },
  { n: "2", title: "Search or browse", text: "Find people by name, profession, company or locality, or filter the members list." },
  { n: "3", title: "Get in touch", text: "Open any profile to see full details and reach out by email or phone." },
];

export default function About() {
  return (
    <div className="page narrow">
      <p className="eyebrow">About us</p>
      <h1 className="page-title">About Community Connect</h1>

      <div className="about-intro">
        <p>
          Community Connect is made for the <strong>Pareek community</strong> and
          its professionals: Chartered Accountants, Company Secretaries and Cost
          &amp; Management Accountants. It helps people in the community connect
          with each other and makes it easier to find people from a related
          company or a related profession.
        </p>
      </div>

      <div className="role-grid">
        {roles.map((r) => (
          <div className="role-card" key={r.short} style={{ background: r.bg }}>
            <span className="role-badge" style={{ color: r.fg }}>{r.short}</span>
            <p>{r.full}</p>
          </div>
        ))}
      </div>

      <div className="about-grid">
        <div className="about-card" style={{ background: "#eceaff" }}>
          <FeatureIcon kind="connect" color="#5b5bd6" />
          <h3>Why we built this</h3>
          <p>
            Finding someone from your own community, in your profession, in a
            company you are interested in or in a new city, should not be hard.
            Community Connect puts everyone in one searchable place.
          </p>
        </div>
        <div className="about-card" style={{ background: "#ffe9dc" }}>
          <FeatureIcon kind="pin" color="#ff7a3d" />
          <h3>What you can do</h3>
          <p>
            Create a profile, search the community, filter members by company,
            locality or profession, and open any member to see their full
            profile.
          </p>
        </div>
      </div>

      <h2 className="about-heading">How it works</h2>
      <div className="steps">
        {steps.map((s) => (
          <div className="step" key={s.n}>
            <span className="step-num">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>

      <div className="beta-note">
        <span className="beta-badge beta-badge-dark">Beta</span>
        <div>
          <h3>This is the beta version</h3>
          <p>
            Community Connect is a personal project, built to solve a problem
            faced by the community. This beta version is the first step, and it
            will be developed at a larger scale later. Features may change as it
            grows.
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
