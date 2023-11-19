# Ink Frontend

Welcome to the Tattoo Studio API documentation. This frontend interacts with [this backend](https://github.com/pedrogardim/ink-backend) in order to compose a fullstack app, featuring authentication, appointment scheduling, and tattoo artist portfolios. It's the 5th project of the GeeksHub Academy Fullstack Bootcamp, showcasing real-world frontend development skills with React, Redux and Tailwind.

## Table of Contents 🗂️

- [Stack 🛠️](#stack)
- [Features 🌟](#features-)

## Stack 🛠️

<img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/-React_Router_DOM-CA4245?style=for-the-badge&logo=react-router&logoColor=white"><img src="https://img.shields.io/badge/-Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white"><img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"><img src="https://img.shields.io/badge/-Vite-747bff?style=for-the-badge&logo=vite&logoColor=white">

## Features 🌟

- **User Authentication:** Secure signup and login processes. 🔒
- **Appointment Creation:** Users can book appointments, with date and user profile validation. 📅
- **Tattoo Artist Portfolios:** Tattooists can upload examples of their work. 🎨
- **Admin Dashboard:** Full control over users, appointments, and tattoo works for administrators. 👩‍💼👨‍💼
- **Redux Toolkit Ecosystem:** Extense use of RTK Slices and createApi. 📚

## Installation 🚀

Get a copy of the project up and running on your local machine for development and testing purposes.

```sh
git clone https://github.com/pedrogardim/ink-frontend.git
cd ink-frontend
yarn install
yarn dev
```

You will need yarn installed, and also the [backend](https://github.com/pedrogardim/ink-backend) set up and running.

## App pages / routes 📑

[TODO]

- `GET /api/appointments/my` - Retrieve user's appointments.
- `POST /api/appointments/my` - Request a new appointment.
- `GET /api/appointments/my/{id}` - Retrieve details of a specific appointment.
- `PUT /api/appointments/my/{id}` - Update a specific appointment.
- `DELETE /api/appointments/my/{id}` - Delete a specific appointment.
