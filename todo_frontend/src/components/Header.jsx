import React, { useState } from 'react';

/**
 * Header renders the app title, quick add input, and theme toggle.
 *
 * Props:
 * - theme: 'light' | 'dark'
 * - onToggleTheme: () => void
 * - onAdd: (title: string) => Promise<void> | void
 */
// PUBLIC_INTERFACE
export default function Header({ theme, onToggleTheme, onAdd }) {
  const [title, setTitle] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
  }

  return (
    <header className="header">
      <div className="header-title">
        <h1>Tasks</h1>
      </div>
      <form className="add-form" onSubmit={submit} aria-label="Add todo form">
        <input
          className="input"
          type="text"
          placeholder="Quick add a task…"
          aria-label="New todo title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button className="btn" type="submit" aria-label="Add task">Add</button>
      </form>
      <div className="header-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}
