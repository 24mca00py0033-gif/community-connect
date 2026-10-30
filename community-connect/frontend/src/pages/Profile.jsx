import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    profession: "",
    company: "",
    locality: "",
    mobile: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);

  // fill the form with the saved profile
  useEffect(() => {
    setForm({
      name: user.name || "",
      lastName: user.lastName || "",
      profession: user.profession || "",
      company: user.company || "",
      locality: user.locality || "",
      mobile: user.mobile || "",
    });
    setPreview(user.profilePic || "");
  }, [user]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setBusy(true);

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (file) data.append("profilePic", file);

    try {
      const res = await api.put("/users/me", data);
      setUser(res.data.user);
      setFile(null);
      setMsg({ type: "ok", text: "Profile saved!" });
    } catch (err) {
      setMsg({ type: "err", text: err.response?.data?.message || "Could not save profile" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page narrow">
      <h1 className="page-title">My profile</h1>

      <form className="card profile-form" onSubmit={onSubmit}>
        <div className="pic-row">
          <Avatar src={preview} name={`${form.name} ${form.lastName}`.trim() || user.name} size={110} />
          <div>
            <label>Profile picture</label>
            <input type="file" accept="image/*" onChange={onFile} />
            <p className="muted small">JPG or PNG, up to 5 MB. Stored on Cloudinary.</p>
          </div>
        </div>

        <div className="two-col">
          <div>
            <label>Name</label>
            <input name="name" value={form.name} onChange={onChange} required />
          </div>
          <div>
            <label>Last name</label>
            <input name="lastName" value={form.lastName} onChange={onChange} />
          </div>
        </div>

        <label>Email</label>
        <input value={user.email} disabled />

        <div className="two-col">
          <div>
            <label>Profession</label>
            <input name="profession" value={form.profession} onChange={onChange} placeholder="CA, CE, ..." />
          </div>
          <div>
            <label>Company</label>
            <input name="company" value={form.company} onChange={onChange} placeholder="Where you work" />
          </div>
        </div>

        <div className="two-col">
          <div>
            <label>Locality</label>
            <input name="locality" value={form.locality} onChange={onChange} placeholder="Where you belong to" />
          </div>
          <div>
            <label>Mobile number</label>
            <input name="mobile" value={form.mobile} onChange={onChange} placeholder="+91 ..." />
          </div>
        </div>

        {msg.text && <div className={msg.type === "ok" ? "alert alert-ok" : "alert"}>{msg.text}</div>}

        <button className="btn" disabled={busy}>{busy ? "Saving..." : "Save profile"}</button>
      </form>
    </div>
  );
}
