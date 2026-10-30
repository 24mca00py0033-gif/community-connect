import { useEffect, useState } from "react";
import api from "../api";
import ProfileCard from "../components/ProfileCard";

export default function Members() {
  const [filters, setFilters] = useState({ companies: [], localities: [], professions: [] });
  const [selected, setSelected] = useState({ company: "", locality: "", profession: "", sort: "newest" });
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // dropdown options
  useEffect(() => {
    api.get("/users/filters").then((res) => setFilters(res.data));
  }, []);

  // reload the list whenever a filter changes
  useEffect(() => {
    setLoading(true);
    api
      .get("/users", { params: selected })
      .then((res) => setMembers(res.data.users))
      .finally(() => setLoading(false));
  }, [selected]);

  const onChange = (e) => setSelected({ ...selected, [e.target.name]: e.target.value });

  const reset = () => setSelected({ company: "", locality: "", profession: "", sort: "newest" });

  return (
    <div className="page">
      <h1 className="page-title">All members</h1>

      <div className="card filter-bar">
        <div>
          <label>Company</label>
          <select name="company" value={selected.company} onChange={onChange}>
            <option value="">All companies</option>
            {filters.companies.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label>Locality</label>
          <select name="locality" value={selected.locality} onChange={onChange}>
            <option value="">All localities</option>
            {filters.localities.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label>Profession</label>
          <select name="profession" value={selected.profession} onChange={onChange}>
            <option value="">All professions</option>
            {filters.professions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label>Sort by</label>
          <select name="sort" value={selected.sort} onChange={onChange}>
            <option value="newest">Newest first</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </div>
        <button className="btn btn-outline" onClick={reset}>Reset</button>
      </div>

      {loading ? (
        <p className="center-msg">Loading members...</p>
      ) : members.length === 0 ? (
        <p className="center-msg">No members match these filters.</p>
      ) : (
        <>
          <p className="muted result-count">{members.length} members</p>
          <div className="grid-cards">
            {members.map((m) => <ProfileCard key={m._id} person={m} />)}
          </div>
        </>
      )}
    </div>
  );
}
