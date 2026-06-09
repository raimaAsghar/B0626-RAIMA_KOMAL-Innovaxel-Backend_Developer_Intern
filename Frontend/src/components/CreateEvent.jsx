import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

export default function CreateEvent() {
  const [form, setForm] = useState({ name: "", totalSeats: "", date: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", {
        name: form.name,
        totalSeats: Number(form.totalSeats),
        date: form.date,
      });
      toast.success("Event created!");
      setForm({ name: "", totalSeats: "", date: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
     <div className="create-container">
    <div className="create-card">
      <h2>Create Event</h2><br></br>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Event Name" value={form.name} onChange={handleChange} required />
        <input name="totalSeats" type="number" placeholder="Total Seats" value={form.totalSeats} onChange={handleChange} min="1" required />
        <input name="date" type="datetime-local" value={form.date} onChange={handleChange} required />
        <button type="submit">Create Event</button>
      </form>
    </div>
    </div>
  );
}