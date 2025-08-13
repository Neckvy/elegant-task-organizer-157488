# Elegant Tasks - React Todo Frontend

A modern, minimalistic todo list application built with React and vanilla CSS, integrated with Supabase.

## Features

- View todo list
- Add new todo
- Edit existing todo
- Delete todo
- Mark todo as completed
- Light/Dark theme switch
- Responsive layout with sidebar, header, and central panel

## Colors

This app uses the provided palette:
- Primary: `#6C63FF`
- Secondary: `#B3B3B3`
- Accent: `#FF6584`

## Setup

1) Install dependencies:
```
npm install
```

2) Configure environment variables by creating a `.env` file from the example:
```
cp .env.example .env
```
Fill in:
```
REACT_APP_SUPABASE_URL=...
REACT_APP_SUPABASE_KEY=...
```

3) Start the app:
```
npm start
```

4) Optional: run tests
```
npm test
```

## Supabase

- See `assets/supabase.md` for specifics and the `todos` table schema.
- The app expects a `todos` table with columns: `id`, `title`, `completed`, `created_at`.

## Development Notes

- No UI framework used; components are built with semantic HTML and custom CSS.
- Public interfaces in the source code are annotated with `// PUBLIC_INTERFACE`.
- Keep RLS disabled or configure appropriate policies during development.
