import React from 'react';
import { ChevronDown, Menu } from 'lucide-react';

function GroupSelector({ groupBy, setGroupBy, sortBy, setSortBy, showDisplayMenu, setShowDisplayMenu }) {
  return (
    <div className="controls">
      <button
        onClick={() => setShowDisplayMenu(!showDisplayMenu)}
        className="display-button"
      >
        <Menu size={16} />
        Display
        <ChevronDown size={16} />
      </button>

      {showDisplayMenu && (
        <div className="dropdown">
          <label className="label">
            Grouping
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="select"
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </label>

          <label className="label">
            Ordering
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select"
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
}

export default GroupSelector;

