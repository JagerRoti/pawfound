# 🐾 PawFound

> A full-stack lost & found pets platform — helping reunite pets with their families.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)

## ✨ Features

- 📋 **Post listings** — report a lost or found pet with photo, breed, location, date, and contact info
- 🔍 **Smart filters** — filter by Lost/Found, pet type (Dogs/Cats/Other), and location keyword
- 📷 **Photo uploads** — local image upload with MIME & extension validation
- 💌 **Contact form** — reach the poster directly from the listing detail page
- ✅ **Mark as Reunited** — close listings once a pet is home (with email ownership verification)
- 🎉 **Reunited gallery** — a happy wall of pets that made it back
- 📱 **Mobile-first design** — responsive Tailwind CSS with warm amber/orange theme

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | SQLite via Prisma v7 ORM |
| File storage | Local `/public/uploads` |
| API | Next.js API Routes |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up the database
npx prisma migrate dev

# Seed with sample data (optional)
npx prisma db seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
pawfound/
├── app/
│   ├── api/              # API routes (listings, upload, contact)
│   ├── components/       # Reusable UI components
│   ├── listings/         # Listing detail + new listing pages
│   ├── reunited/         # Reunited pets gallery
│   └── page.tsx          # Homepage with filters
├── lib/
│   ├── prisma.ts         # Prisma client singleton
│   └── parseId.ts        # Strict ID validation utility
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Sample data seeder
└── public/uploads/       # Uploaded pet photos
```

## 🔒 Security

- Upload validation: MIME type + file extension checks, UUID filenames (path traversal prevention)
- PATCH ownership: callers must verify with the listing's contact email
- Strict ID parsing: rejects non-integer and malformed IDs
- Input sanitisation on all API routes

## 📸 Screenshots

| Homepage | Listing Detail | Post a Listing |
|---|---|---|
| Listing grid with filters | Full pet info + contact form | Lost/Found toggle + photo upload |

## 📄 License

MIT
