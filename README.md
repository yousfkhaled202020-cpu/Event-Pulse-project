# EventPulse - Project Documentation

## Overview
**EventPulse** is a robust, back-end event management and real-time communication platform. It provides role-based access control allowing users to register as either **Attendees** or **Admins**, facilitating seamless event scheduling, real-time messaging, and participant management.

---

## Features & Capabilities

### Attendee Features
* User registration and secure authentication.
* Browse and search scheduled events.
* Register for events and cancel registrations dynamically.
* Real-time messaging and announcement viewing within event rooms.

### Admin Features
* Comprehensive event management (Create, Edit, Delete events).
* Broadcast real-time announcements directly to specific event rooms.
* User and role oversight.

---

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **Real-time Communication:** Socket.io
* **Testing:** Jest, Supertest

---

## Local Installation & Setup

Follow these steps to set up and run the project locally on your machine:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd eventpulse
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   ```

4. **Seed the Database**
   Populate the database with initial sample data using the seed script:
   ```bash
   npm run seed
   ```

5. **Start the Application**
   * **Development Mode:**
     ```bash
     npm run dev
     ```
   * **Production Mode:**
     ```bash
     node app.js
     ```

---

## API Endpoint Summary
### Events endpoints:
| Method | Endpoint | Description | Access Role |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/events` | Retrieve a list of all events | Public / Attendee / Admin |
| `POST` | `/api/events` | Create a new event | Admin |
| `GET` | `/api/events/:id` | Retrieve details of a specific event | Public / Attendee / Admin |
| `PATCH` | `/api/events/:id` | Update an existing event | Admin |
| `DELETE` | `/api/events/:id` | Delete an event | Admin |

### Auth endpoints

| `POST` | `/api/auth/register` | Register a new user account | Public |
| `POST` | `/api/auth/login` | Authenticate and log into an account | Public |

## Event Registration endpoints

| Method | Endpoint | Description | Access Role |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/registrations/all` | Retrieve a list of all registrations |  Admin |
| `POST` | `/api/registrations` | Create a new registration | Attendee |
| `GET` | `/api/registrations/:id` | Retrieve details of my registrations |  Attendee  |
| `DELETE` | `/api/registrations/:id` | Cancel registration | Attendee |


## Message endpoints

| Method | Endpoint | Description | Access Role |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/messages/:eventId` | Retrieve a messages History | Public / Attendee / Admin |
| `POST` | `/api/messages` | Create a new registration | Attendee |


## Live Deployment Link:
vercel: https://eventpulseproject.vercel.app
github repo:https://github.com/yousfkhaled202020-cpu/Event-Pulse-project.git
drive link :https://drive.google.com/drive/folders/1GKG37KYmaABx6fdjxi0h5dpqgb2QhMM3?usp=sharing




