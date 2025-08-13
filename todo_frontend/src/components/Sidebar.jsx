import React from 'react';

/**
 * Sidebar navigation placeholder.
 * Props:
 * - items: Array<{ id: string, label: string, active?: boolean, onClick: () => void }>
 */
// PUBLIC_INTERFACE
export default function Sidebar({ items = [] }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-badge" />
        Elegant Tasks
      </div>
      <nav className="nav">
        {items.map(i => (
          <button key={i.id} className={i.active ? 'active' : ''} onClick={i.onClick}>
            {i.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
