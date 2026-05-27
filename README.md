<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Inventory Management System

## Full Stack Task Management and Inventory Collaboration System

This project is built using:

- Backend: Django + Django REST Framework
- Frontend: Next.js
- Database: MySQL
- Authentication: JWT + Google Login
- Email Service: SMTP
- Environment Variables: dotenv

---

## Features

- User Authentication
- Admin and User Roles
- Task Creation
- Team Collaboration
- Invitation System
- Email Notifications
- JWT Authentication
- Google Sign-In
- REST APIs
- Task Permission Control

---

## Backend Setup

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` file and add:

```env
SECRET_KEY=your_secret_key

DB_NAME=your_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_16_character_password
```

Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

Create superuser:

```bash
python manage.py createsuperuser
```

Run server:

```bash
python manage.py runserver
```

---

## API Endpoints

### Users
- `/api/users/`

### Tasks
- `/api/tasks/`

### Invitations
- `/api/invitations/`

---

## Authentication

- JWT Authentication
- Google OAuth Login
- Form Authentication

---

## Tech Stack

### Backend
- Django
- Django REST Framework
- JWT
- MySQL

### Frontend
- Next.js
- JavaScript

---

## Developed For

Academic Full Stack Development Project Submission.
>>>>>>> 0c2283f3c3e420d7648be4d46fa4c5dafe3af4c6
