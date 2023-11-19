# Ink Frontend

Welcome to the Tattoo Studio API documentation. This frontend interacts with [this backend](https://github.com/pedrogardim/ink-backend) in order to compose a fullstack app, featuring authentication, appointment scheduling, and tattoo artist portfolios. It's the 5th project of the GeeksHub Academy Fullstack Bootcamp, showcasing real-world frontend development skills with React, Redux and Tailwind.

![ezgif com-video-to-gif](https://github.com/pedrogardim/ink-frontend/assets/81443264/f8795614-3f8a-4f55-8c2f-7326381d8b23)

## Table of Contents 🗂️

- [Stack 🛠️](#stack-)
- [Features 🌟](#features-)
- [Installation 🚀](#installation-)
- [App pages / routes 📑](#app-pages-/-routes-)
- [Author ✒️](#author-)
- [Roadmap 🛣️](#roadmap-️)
- [Acknowledgements 🎓](#acknowledgements-)


## Stack 🛠️

<img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/-React_Router_DOM-CA4245?style=for-the-badge&logo=react-router&logoColor=white"><img src="https://img.shields.io/badge/-Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white"><img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"><img src="https://img.shields.io/badge/-Vite-747bff?style=for-the-badge&logo=vite&logoColor=white">

## Features 🌟

- **User Authentication:** Secure signup and login processes. 🔒
- **Appointment Creation:** Users can book appointments, with date and user profile validation. 📅
- **Tattoo Artist Portfolios:** Tattooists can upload examples of their work. 🎨
- **Admin Dashboard:** Full control over users, appointments, and tattoo works for administrators. 👩‍💼👨‍💼
- **Redux Toolkit Ecosystem:** Extense use of RTK Slices and createApi. 📚
- **Tailwind CSS:** Designed with Tailwind CSS. 🎨
- **Custom components:** Custom fully functional calendar and gallery components. 🎨

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

- `/`
  - Landing page
  - Home page for logged users
- `/login` - Login page
- `/register` - Register page
- `/profile` - Profile view / update page
- `/appointments` - My appointments page (List, and filter appointments)
  - `/appointments/{id}` - See an specific appointment detais and update it
- `/gallery` - Tattoo artist portfolios page with search
  - `/gallery/{id}` - See an specific tattoo artist portfolio
- `/admin` - Admin dashboard page (only a super admin can access it)
  - `/admin/users` - Users CRUD
  - `/admin/appointments` - Appointments CRUD
  - `/admin/tattooWorks` - Tattoo works CRUD

## Author ✒️

- **Pedro Gardim** - Project Developer
  - [GitHub](https://github.com/pedrogardim) - [LinkedIn](https://www.linkedin.com/in/pedro-gardim) - [Portfolio](https://pedrogardim.com)

## Roadmap 🛣️

- **Add notifications 🔔** - So users know when their appointments are modified, created or deleted.
- **Add image upload 📸** - So users can upload profile pictures and tattoo artist portfolios.
- **Add Admin CRUD features 🎛️** - Add create, update, delete features.

## Known bugs 🐛


## Acknowledgements 🎓

- A big shoutout to the **Geekshubs Academy** for the opportunity to learn and grow as a developer.
