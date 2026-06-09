import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

export default function RegisterUser({ prefillEventId = "" }) {
  const [form, setForm] = useState({ userName: "", eventId: prefillEventId });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/registrations", form);
      toast.success("Registered successfully!");
      setForm({ userName: "", eventId: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="create-container">
    <div className="create-card">
      <h2>Register for Event</h2><br></br>
      <form onSubmit={handleSubmit}>
        <input name="userName" placeholder="Your Name" value={form.userName} onChange={handleChange} required />
        <input name="eventId" placeholder="Event ID" value={form.eventId} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
}