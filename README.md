# Notice Board

A responsive Notice Board application built with Next.js, Prisma, and PostgreSQL. The application supports full create, read, update, and delete operations for notices.

## Live Application

https://reno-notice-board-delta.vercel.app

## Features

- Create new notices
- View all notices
- Edit existing notices
- Delete notices with a confirmation step
- Server-side input validation
- Urgent notices displayed before Normal notices
- Visible Urgent badge
- Responsive layout for desktop and mobile
- Persistent data using a hosted PostgreSQL database

## Tech Stack

- Next.js Pages Router
- Prisma
- PostgreSQL
- Neon
- Vercel
- CSS

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/nischay3003/reno-notice-board
cd reno-notice-board
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add your PostgreSQL connection string:

```env
DATABASE_URL="your_postgresql_connection_string"
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run the database migrations:

```bash
npx prisma migrate deploy
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## What I Would Improve With More Time

With more time, I would add the optional image upload feature for notices using external cloud storage. I would also add automated API tests to make the application easier to maintain as it grows.

## AI Usage

I used AI as a development assistant to help review the assignment requirements, plan the implementation, troubleshoot development issues, and improve parts of the code. I reviewed and tested the implementation throughout development.