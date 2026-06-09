# Event Registration System — Backend

A RESTful API for managing events and user registrations, built with Node.js, Express, and MongoDB.

---

## Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** via Mongoose
- **CORS**, **dotenv**

---

## Project Structure

```
Backend/
├── server.js
├── package.json
└── src/
    ├── app.js
    ├── config/database.js
    ├── middleware/error.js
    ├── models/
    │   ├── event.model.js
    │   └── registration.model.js
    ├── routes/
    │   ├── event.routes.js
    │   └── registration.routes.js
    └── controllers/
        ├── event.controller.js
        └── registration.controller.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
git clone <repo-url>
cd Backend
npm install
```

### Environment Variables

Create a `.env` file in the `Backend/` directory:

```env
MONGO_URI=mongodb://localhost:27017/Your-mongo-uri
```

### Run the Server

```bash
node server.js
```

Server starts on `http://localhost:3000`

---

## API Endpoints

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/events` | Create a new event |
| `GET` | `/api/events` | Get all events (`?upcoming=true` for filter) |
| `GET` | `/api/events/stats` | Get event statistics |

---

### Registrations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/registrations` | Register a user for an event |
| `GET` | `/api/registrations` | Get all active registrations |
| `PATCH` | `/api/registrations/:id/cancel` | Cancel a registration |

---

## Frontend

A basic frontend is included in the `Frontend/` folder to interact with the API visually. It allows users to create events, view event listings, and register for or cancel registrations — serving as a functional UI to demonstrate all backend endpoints in action.

---

## API Testing

All endpoints were tested using **Thunder Client** (VS Code extension). Tests covered event creation, listing with filters, user registration, duplicate prevention, seat management, and cancellation flows.

---

## Key Features

- Atomic seat booking to prevent race conditions
- Automatic seat restoration on cancellation
- Duplicate registration prevention
- Upcoming events filter
- Stats endpoint with total events, registrations, and available seats
