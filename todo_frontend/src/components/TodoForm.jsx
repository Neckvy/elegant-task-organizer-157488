import React, { useState } from 'react';

/**
 * TodoForm renders an input and submit button to add a new todo.
 *
 * Props:
 * - onSubmit: (title: string) => void
 */
// PUBLIC_INTERFACE
export default function TodoForm({ onSubmit }) {
  const [val, setVal] = useState('');
  function submit(e) {
    e.preventDefault();
    if (!val.trim()) return;
    onSubmit(val.trim());
    setVal('');
  }
  return (
    <form className="add-form" onSubmit={submit}>
      <input
        className="input"
        placeholder="Add a task…"
        value={val}
        onChange={e => setVal(e.target.value)}
        aria-label="New todo"
      />
      <button className="btn" type="submit">Add</button>
    </form>
  );
}
