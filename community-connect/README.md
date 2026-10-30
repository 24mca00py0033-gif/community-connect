# Community Connect

A simple MERN web app (beta) that connects the Pareek community's Chartered Accountants (CA), Company Secretaries (CS) and Cost & Management Accountants (CMA) by company, profession and locality.

**Stack:** Node.js + Express (backend) · React + Vite (frontend) · MongoDB (database) · JWT + bcrypt (auth) · Cloudinary (profile pictures)

**Architecture:** monolith. The React app is built once and the Express server serves it together with the API, so everything runs on one port.

```
community-connect/
├── backend/
│   ├── config/        db.js, cloudinary.js
│   ├── middleware/    auth.js (JWT check)
│   ├── models/        User.js
│   ├── routes/        auth.js, users.js
│   ├── .env           <-- put your secrets here
│   └── server.js
└── frontend/
    └── src/
        ├── components/  Navbar, ProfileCard, ProtectedRoute
        ├── context/     AuthContext
        ├── pages/       Login, Register, Home, Search, Profile, Members, About
        └── styles.css
```

## 1. Add your secrets

Open `backend/.env` and fill in:

```
MONGO_URI=...            # local MongoDB or Atlas connection string
JWT_SECRET=...           # any long random string
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## 2. Install

```
npm run install-all
```

## 3a. Run as one app (monolith)

```
npm run build     # builds the React app into frontend/dist
npm start         # Express serves API + website at http://localhost:5000
```

## 3b. Or run in development (two terminals, hot reload)

```
npm run dev:backend     # http://localhost:5000
npm run dev:frontend    # http://localhost:5173  (proxies /api to 5000)
```

## Pages

| Route        | What it does                                                        |
|--------------|---------------------------------------------------------------------|
| `/login`     | Login, token is created and stored                                  |
| `/register`  | Register with name, email, password (password stored as bcrypt hash)|
| `/`          | Home: 3D animated intro and 10 member profiles                      |
| `/search`    | Search by name, last name, profession, locality, company            |
| `/profile`   | Edit your profile and upload a picture (Cloudinary)                 |
| `/members`   | All members with filters: company, locality, profession, sort       |
| `/about`     | Why Community Connect exists                                        |

## API

- `POST /api/auth/register` · `POST /api/auth/login` · `GET /api/auth/me`
- `GET /api/users/featured` · `GET /api/users/search` · `GET /api/users/filters` · `GET /api/users`
- `PUT /api/users/me` (multipart, field `profilePic`)

All `/api/users` routes need `Authorization: Bearer <token>`.
