# Gym Class Scheduling and Membership Management System

## Project Overview

This system is designed to manage gym class schedules, bookings, and memberships with role-based access. The system defines three roles: `Admin`, `Trainer`, and `Trainee`, each with specific permissions.

- **Admin**: Responsible for scheduling up to 5 classes per day, managing trainers, and assigning them to classes.
- **Trainer**: Can view their assigned class schedules but cannot manage or create new classes or profiles.
- **Trainee**: Can book classes, manage their profiles, and cancel bookings if needed.

## Business Logic Implemented

### Class Scheduling

- **Maximum of 5 classes per day**.
- **Each class lasts for 2 hours**.
- **Maximum of 10 trainees per class**.
- **Once a class reaches its capacity, no further bookings can be made**.
- Admins can schedule new classes and assign trainers.

### Booking System

- **Trainees** can book classes if there is availability (maximum 10 trainees per class).
- **Trainees cannot book multiple classes at the same time**.
- **Trainees can cancel their bookings** if the class has not already started.

## Setup Instructions

1. Clone the repository and navigate:

```bash
git clone https://github.com/tanvir1017/class-and-membership-management
```

```bash
cd class-and-membership-management
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file with the following environment variables:

```bash
NODE_ENV = null
PORT = null
DATABASE_URL = null
BCRYPT_SALT_ROUNDS = null
JWT_ACCESS_TOKEN = null
JWT_REFRESH_TOKEN = null
JWT_ACCESS_EXPIRES_IN = null
JWT_REFRESH_EXPIRES_IN = null
ADMIN_PASSWORD = null
```

4. Now start the project by putting this command on terminal

```bash
npm start:dev
```

## Example Workflow

1. **Login**: Trainee or Admin logs in using their credentials to obtain a JWT token.
2. **Book a Class**: A Trainee can view available classes and book one if there are slots.
3. **Cancel Booking**: A Trainee can cancel their booking as long as the class has not yet started.
4. **Admin Class Scheduling**: Admin schedules a new class, and assigns trainers to the class.

## API Endpoints

### Base URL

The server runs at:  
`http://localhost:8080/api/v1`

For individual endpoints, refer to the sections below:

---

## 🔐 Authentication

- **POST** `/auth/login` – User login (_Available for all roles_)
- **POST** `/users/create-user` – Create an **Admin** (Admins can later create trainers)
- **POST** `/users/create-trainee` – Create a **Trainee** _(Role must be `trainee`)_
- **PATCH** `/users/change-role` – **Admin-only**: Change user roles
- **PATCH** `/users/:id/update` – Update user details
- **DELETE** `/users/:id/delete` – Delete a user
- **GET** `/users/all` – Retrieve all users

---

## 📅 Class Scheduling

- **GET** `/classes` – Retrieve all scheduled classes
- **POST** `/classes/schedule` – **Admin-only**: Create a new class schedule
- **POST** `/classes/:classId/assign-trainers` – **Admin-only**: Assign trainers to a scheduled class

---

## 🎟️ Booking & Enrollment

- **GET** `/booking` – Retrieve all booked classes
- **POST** `/booking/create` – **Trainee-only**: Enroll in a class
- **DELETE** `/booking/cancel` – **Trainee-only**: Cancel a booked class

---

🔹 **Note:** Access to certain routes is restricted based on roles _(Admin, Trainer, Trainee)_. Ensure you authenticate before making requests.

🔹 Also, I've putted a postman json on the project root file.

## Database Design

![Gym Scheduling and Membership Database design](relational-diagram.svg)
