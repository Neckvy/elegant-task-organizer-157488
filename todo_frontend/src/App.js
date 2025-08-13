import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
 // Sidebar removed (unused)
import Header from './components/Header';
import TodoList from './components/TodoList';
import { fetchTodos, addTodo, updateTodo, deleteTodo, toggleTodoCompleted } from './services/todoService';

/**
 * Root application component.
 * Manages theme, filter mode, and todo CRUD interactions.
 */
// PUBLIC_INTERFACE
function App() {
  /** Theme state: "light" | "dark" (default light) */
  const [theme, setTheme] = useState('light');
  /** All todos fetched from backend */
  const [todos, setTodos] = useState([]);
  /** Loading and error for CRUD operations */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  /** Filter state: 'all' | 'active' | 'completed' */
  const [filter, setFilter] = useState('all');

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Load initial todos
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (e) {
        setError(e?.message || 'Failed to load todos.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /** Filtered todos based on selected filter mode */
  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.completed);
    if (filter === 'completed') return todos.filter(t => t.completed);
    return todos;
  }, [todos, filter]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  async function handleAddTodo(title) {
    if (!title || !title.trim()) return;
    setError('');
    setLoading(true);
    try {
      const created = await addTodo(title.trim());
      // Prepend to list
      setTodos(prev => [created, ...prev]);
    } catch (e) {
      setError(e?.message || 'Failed to add todo.');
    } finally {
      setLoading(false);
    }
  }

  // PUBLIC_INTERFACE
  async function handleToggleComplete(todo) {
    setError('');
    try {
      const updated = await toggleTodoCompleted(todo.id, !todo.completed);
      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    } catch (e) {
      setError(e?.message || 'Failed to update status.');
    }
  }

  // PUBLIC_INTERFACE
  async function handleEdit(todoId, nextTitle) {
    if (!nextTitle || !nextTitle.trim()) return;
    setError('');
    try {
      const updated = await updateTodo(todoId, { title: nextTitle.trim() });
      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    } catch (e) {
      setError(e?.message || 'Failed to edit todo.');
    }
  }

  // PUBLIC_INTERFACE
  async function handleDelete(todoId) {
    setError('');
    try {
      await deleteTodo(todoId);
      setTodos(prev => prev.filter(t => t.id !== todoId));
    } catch (e) {
      setError(e?.message || 'Failed to delete todo.');
    }
  }

  const counts = useMemo(() => {
    const completed = todos.filter(t => t.completed).length;
    const active = todos.length - completed;
    return { total: todos.length, active, completed };
  }, [todos]);

  return (
    <div className="app-shell" role="application" aria-label="Todo Application">
      <aside className="sidebar" aria-label="Navigation Sidebar">
        <div className="brand">
          <div className="brand-badge" />
          Elegant Tasks
        </div>
        <nav className="nav" aria-label="Todo Filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
          >
            All <span className="count">{counts.total}</span>
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
            aria-pressed={filter === 'active'}
          >
            Active <span className="count">{counts.active}</span>
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
            aria-pressed={filter === 'completed'}
          >
            Completed <span className="count">{counts.completed}</span>
          </button>
        </nav>
      </aside>

      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onAdd={handleAddTodo}
      />

      <main className="main" aria-live="polite">
        <div className="toolbar">
          <div>{filteredTodos.length} item(s) • {filter}</div>
          {loading ? <div>Loading…</div> : null}
        </div>
        {error ? <div className="helper" role="alert">{error}</div> : null}
        {filteredTodos.length === 0 && !loading ? (
          <div className="helper">No tasks here yet. Add your first task above!</div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
