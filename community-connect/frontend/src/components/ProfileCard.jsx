import { Link } from "react-router-dom";
import Avatar, { colorFor, fullName } from "./Avatar";

// One member card. Clicking it opens the full profile page.
export default function ProfileCard({ person }) {
  const name = fullName(person);
  const [topColor] = colorFor(name);

  return (
    <Link to={`/members/${person._id}`} className="pcard">
      <div className="pcard-top" style={{ background: topColor }} />
      <Avatar src={person.profilePic} name={name} size={80} />

      <h3>{name}</h3>
      {person.profession && <span className="tag">{person.profession}</span>}

      <ul className="pcard-details">
        {person.company && <li>🏢 {person.company}</li>}
        {person.locality && <li>📍 {person.locality}</li>}
      </ul>

      <span className="pcard-link">View profile →</span>
    </Link>
  );
}
