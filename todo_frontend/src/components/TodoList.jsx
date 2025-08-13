import React from 'react';
import TodoRow from './TodoRow';

/**
 * TodoList renders all todos with actions.
 *
 * Props:
 * - todos: Array<{ id, title, completed, created_at }>
 * - onToggleComplete: (todo) => void
 * - onEdit: (id, newTitle) => void
 * - onDelete: (id) => void
 */
// PUBLIC_INTERFACE
export default function TodoList({ todos, onToggleComplete, onEdit, onDelete }) {
  return (
    <div className="todo-list" role="list">
      {todos.map(todo => (
        <TodoRow
          key={todo.id}
          todo={todo}
          onToggle={() => onToggleComplete(todo)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
