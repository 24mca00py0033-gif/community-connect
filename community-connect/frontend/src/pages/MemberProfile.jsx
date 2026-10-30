import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import Avatar, { fullName } from "../components/Avatar";
import { useAuth } from "../context/AuthContext";

// Full profile of one member (opened by clicking a card)
export default function MemberProfile() {
  const { id } = useParams();
  const { user: me } = useAuth();
  const [person, setPerson] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get(`/users/${id}`)
      .then((res) => setPerson(res.data.user))
      .catch((err) => setError(err.response?.data?.message || "Could not load this profile"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="center-msg">Loading profile...</p>;

  if (error) {
    return (
      <div className="page narrow">
        <p className="center-msg">{error}</p>
        <div className="center-btn">
          <Link to="/members" className="btn btn-outline">Back to members</Link>
        </div>
      </div>
    );
  }

  const name = fullName(person);
  const isMe = me && me._id === person._id;
  const since = new Date(person.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  const details = [
    { icon: "🏢", label: "Company", value: person.company },
    { icon: "📍", label: "Locality", value: person.locality },
    { icon: "📞", label: "Mobile", value: person.mobile },
    { icon: "✉️", label: "Email", value: person.email },
  ];

  return (
    <div className="page">
      <Link to="/members" className="back-link">← Back to members</Link>

      <div className="mp-banner" />

      <div className="mp-head">
        <div className="mp-avatar">
          <Avatar src={person.profilePic} name={name} size={132} />
        </div>
        <div className="mp-title">
          <h1>{name}</h1>
          {person.profession && <span className="tag">{person.profession}</span>}
          <p className="muted small">Member since {since}</p>
        </div>
        <div className="mp-actions">
          {isMe ? (
            <Link to="/profile" className="btn">Edit my profile</Link>
          ) : (
            <>
              <a href={`mailto:${person.email}`} className="btn">Send email</a>
              {person.mobile && (
                <a href={`tel:${person.mobile}`} className="btn btn-outline">Call</a>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mp-grid">
        {details.map((d) => (
          <div className="info-card" key={d.label}>
            <span className="info-icon">{d.icon}</span>
            <div>
              <p className="info-label">{d.label}</p>
              <p className="info-value">{d.value || <span className="muted">Not added yet</span>}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
