-- Create books table
create table books (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  borrower text not null,
  borrow_date timestamp with time zone not null,
  due_date timestamp with time zone not null,
  returned boolean default false,
  created_at timestamp with time zone default now()
);

-- Create index for faster queries
create index books_created_at_idx on books(created_at desc); 