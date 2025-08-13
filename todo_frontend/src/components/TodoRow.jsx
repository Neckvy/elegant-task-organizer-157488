import React, { useState } from 'react';

/**
 * TodoRow renders a single todo.
 *
 * Props:
 * - todo: { id, title, completed, created_at }
 * - onToggle: () => void
 * - onEdit: (id, newTitle) => void
 * - onDelete: (id) => void
 */
// PUBLIC_INTERFACE
export default function TodoRow({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  function saveEdit() {
    if (!draft.trim()) return setIsEditing(false);
    onEdit(todo.id, draft.trim());
    setIsEditing(false);
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`} role="listitem">
      <input
        className="checkbox"
        type="checkbox"
        checked={!!todo.completed}
        onChange={onToggle}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'active' : 'completed'}`}
      />
      <div>
        {isEditing ? (
          <input
            className="input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') {
                setIsEditing(false);
                setDraft(todo.title);
              }
            }}
            autoFocus
            aria-label="Edit title"
          />
        ) : (
          <div className="todo-title">{todo.title}</div>
        )}
        <div className="todo-meta">
          {new Date(todo.created_at || Date.now()).toLocaleString()}
        </div>
      </div>
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button className="icon-btn" onClick={saveEdit} aria-label="Save edit">Save</button>
            <button
              className="icon-btn secondary"
              onClick={() => {
                setIsEditing(false);
                setDraft(todo.title);
              }}
              aria-label="Cancel edit"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="icon-btn" onClick={() => setIsEditing(true)} aria-label="Edit todo">Edit</button>
            <button className="icon-btn delete" onClick={() => onDelete(todo.id)} aria-label="Delete todo">Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
