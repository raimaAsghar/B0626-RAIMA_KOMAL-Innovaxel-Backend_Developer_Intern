import { useEffect, useState } from "react";
import api from "../api";

export default function EventsList({ setActive, goToRegister }) {
  const [events, setEvents] = useState([]);
  const [upcoming, setUpcoming] = useState(false);
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    try {
      const res = await api.get("/events/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadEvents = async () => {
    try {
      const res = await api.get("/events", { params: upcoming ? { upcoming: true } : {} });
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadStats(); }, []);
  useEffect(() => { loadEvents(); }, [upcoming]);

  return (
    <div>
      {/* STATS CARDS */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Events</span>
            <span className="stat-value">{stats.totalEvents}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Upcoming Events</span>
            <span className="stat-value">{stats.upcomingEvents}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Registrations</span>
            <span className="stat-value">{stats.totalRegistrations}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Available Seats</span>
            <span className="stat-value orange">{stats.availableSeats}</span>
          </div>
        </div>
      )}

      {/* EVENTS TABLE */}
      <div className="card">
        <div className="events-header">
          <h2>All Events</h2>
          <div className="events-header-right">
            <button type="button" className="create-btn" onClick={() => setActive("Create Event")}>
              + Create Event
            </button>
          </div>
        </div>

        {events.length === 0 ? (
          <p className="empty">No events found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Total Seats</th>
                <th>Available</th>
                <th>Registrations</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{new Date(e.date).toLocaleString()}</td>
                  <td>{e.totalSeats}</td>
                  <td>
                    <span className={e.availableSeats === 0 ? "badge red" : "badge green"}>
                      {e.availableSeats}
                    </span>
                  </td>
                  <td>{e.totalRegistrations}</td>
                  <td>
                    <button
                      type="button"
                      className="register-row-btn"
                      disabled={e.availableSeats === 0}
                      onClick={() => goToRegister(e._id)}
                    >
                      {e.availableSeats === 0 ? "Full" : "Register"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}