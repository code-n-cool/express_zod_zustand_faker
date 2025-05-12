# 🧠 Express + Zod + Zustand + Faker API

A **lightweight mock API** built using modern tools like **Express.js**, **Zod**, **Zustand**, and **Faker.js** — perfect for rapid prototyping, frontend integration, and demos without relying on a real database.

✅ Check server availability or test endpoints using the deployed API:


Live Demo: [https://express-zod-zustand-faker.onrender.com](https://express-zod-zustand-faker.onrender.com)

---

## 🚀 Project Overview

This backend simulates a user database and provides three API endpoints:

| Method | Endpoint         | Description                             |
| ------ | ---------------- | --------------------------------------- |
| GET    | `/api/users`     | Fetch paginated user list (searchable)  |
| GET    | `/api/users/:id` | Fetch a single user by ID               |
| POST   | `/api/logs`      | Log user actions (e.g., search, clicks) |

The system is designed with:

- **Zod**: To validate and type-check input parameters
- **Zustand (vanilla)**: To hold in-memory mock data
- **Faker.js**: To generate 50 randomized mock users
- **Express.js + TypeScript**: For a robust and strongly-typed server

---

## 📦 Tech Stack

| Tool       | Purpose                            |
| ---------- | ---------------------------------- |
| Express.js | Web framework                      |
| TypeScript | Static typing                      |
| Zod        | Input validation                   |
| Zustand    | State management (used as mock DB) |
| Faker.js   | Fake data generation               |
| Morgan     | Logging requests                   |
| CORS       | API access from other origins      |

---

## 🛠 Endpoints & Examples

### GET `/api/users`

Query parameters:

- `q` _(optional)_: search string (matches `name`, `email`, `bio`)
- `page` _(optional)_: page number (default: 1)
- `limit` _(optional)_: items per page (default: 10)

**Example:**

```http
GET /api/users?q=john&page=2&limit=5
```
