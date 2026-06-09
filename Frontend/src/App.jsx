import { useState } from "react";
import CreateEvent from "./components/CreateEvent";
import RegisterUser from "./components/RegisterUser";
import EventsList from "./components/EventsList";
import CancelRegistration from "./components/CancelRegistration";

const tabs = ["Events", "Registrations"];

export default function App() {
  const [active, setActive] = useState("Events");
  const [prefillEventId, setPrefillEventId] = useState("");

  const goToRegister = (eventId) => {
    setPrefillEventId(eventId);
    setActive("Register");
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">Event Registration System</div>
        <div className="nav-links">
          {tabs.map((tab) => (
            <span
              key={tab}
              className={active === tab ? "nav-link active" : "nav-link"}
              onClick={() => setActive(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
      </nav>

      <div className="container">
        {active === "Events" && <EventsList setActive={setActive} goToRegister={goToRegister} />}
        {active === "Create Event" && <CreateEvent />}
        {active === "Register" && <RegisterUser prefillEventId={prefillEventId} />}
        {active === "Registrations" && <CancelRegistration />}
      </div>
    </div>
  );
}