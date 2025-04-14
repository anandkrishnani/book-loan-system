# Book Loan System

A simple and efficient book loan management system built with Next.js and Supabase.

## Features

- Track borrowed books and their due dates
- Mark books as returned
- Automatic 30-day loan period calculation
- Persistent data storage with Supabase
- Responsive design

## Tech Stack

- Next.js 15.3.0
- TypeScript
- Supabase (Database)
- Tailwind CSS

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Deployment

1. Create a Supabase project and set up the database using the SQL in `database/schema.sql`
2. Deploy to Vercel:
   - Connect your GitHub repository
   - Add environment variables
   - Deploy

## Database Schema

```sql
create table books (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  borrower text not null,
  borrow_date timestamp with time zone not null,
  due_date timestamp with time zone not null,
  returned boolean default false,
  created_at timestamp with time zone default now()
);

create index books_created_at_idx on books(created_at desc);
```
