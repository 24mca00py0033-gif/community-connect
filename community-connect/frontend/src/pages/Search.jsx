import { useState } from "react";
import api from "../api";
import ProfileCard from "../components/ProfileCard";

const empty = { name: "", lastName: "", profession: "", locality: "", company: "" };

export default function Search() {
  const [form, setForm] = useState(empty);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.get("/users/search", { params: form });
      setResults(res.data.users);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const onClear = () => {
    setForm(empty);
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="page">
      <h1 className="page-title">Search the community</h1>

      <form className="card search-form" onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input name="name" value={form.name} onChange={onChange} placeholder="First name" />
        </div>
        <div>
          <label>Last name</label>
          <input name="lastName" value={form.lastName} onChange={onChange} placeholder="Last name" />
        </div>
        <div>
          <label>Profession</label>
          <input name="profession" value={form.profession} onChange={onChange} placeholder="CA, CS, CMA" />
        </div>
        <div>
          <label>Locality</label>
          <input name="locality" value={form.locality} onChange={onChange} placeholder="e.g. Karol Bagh" />
        </div>
        <div>
          <label>Company</label>
          <input name="company" value={form.company} onChange={onChange} placeholder="Company name" />
        </div>
        <div className="search-actions">
          <button className="btn" disabled={loading}>{loading ? "Searching..." : "Search"}</button>
          <button type="button" className="btn btn-outline" onClick={onClear}>Clear</button>
        </div>
      </form>

      {searched && (
        <>
          <p className="muted result-count">
            {results.length} {results.length === 1 ? "person" : "people"} found
          </p>
          {results.length === 0 ? (
            <p className="center-msg">No one matches your search. Try fewer filters.</p>
          ) : (
            <div className="grid-cards">
              {results.map((p) => (
                <ProfileCard key={p._id} person={p} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
