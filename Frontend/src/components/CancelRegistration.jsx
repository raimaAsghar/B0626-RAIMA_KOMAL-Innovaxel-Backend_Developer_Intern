import { useState, useEffect } from "react";
import api from "../api";
import toast from "react-hot-toast";

export default function CancelRegistration() {
  const [regId, setRegId] = useState("");
  const [registrations, setRegistrations] = useState([]);

  const loadRegistrations = async () => {
    try {
      const res = await api.get("/registrations");
      setRegistrations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadRegistrations(); }, []);

  const handleCancel = async (id) => {
    try {
      await api.patch(`/registrations/${id}/cancel`);
      toast.success("Registration cancelled!");
      loadRegistrations(); // refresh list
      if (regId === id) setRegId("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="card">
      <h2>Active Registrations</h2>

      {registrations.length === 0 ? (
        <p className="empty">No active registrations found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Event</th>
              <th>Registered At</th>
              <th>Registration ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r._id}>
                <td>{r.userName}</td>
                <td>{r.eventId?.name || r.eventId}</td>
                <td>{new Date(r.registeredAt).toLocaleString()}</td>
                <td className="small">{r._id}</td>
                <td>
                  <button
                    type="button"
                    className="cancel-row-btn"
                    onClick={() => handleCancel(r._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}