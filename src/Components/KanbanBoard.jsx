import React from 'react';
import TicketCard from './TicketCard';
import menuIcon from '../assets/icons_FEtask/3 dot menu.svg';
import addIcon from '../assets/icons_FEtask/add.svg';
import backlogIcon from '../assets/icons_FEtask/Backlog.svg';
import inProgressIcon from '../assets/icons_FEtask/in-progress.svg';
import toDoIcon from '../assets/icons_FEtask/To-do.svg';

function KanbanBoard({ users,tickets, groupBy, sortBy }) {
  // Helper function for grouping tickets
  const groupTickets = () => {
    const grouped = {};
    if (groupBy === 'status') {
      tickets.forEach(ticket => {
        if (!grouped[ticket.status]) {
          grouped[ticket.status] = [];
        }
        grouped[ticket.status].push(ticket);
      });
    } else if (groupBy === 'user') {
      tickets.forEach(ticket => {
        const user = users.find(u => u.id === ticket.userId);
        const userName = user ? user.name : 'Unassigned';
        if (!grouped[userName]) {
          grouped[userName] = [];
        }
        grouped[userName].push(ticket);
      });
    } else if (groupBy === 'priority') {
      tickets.forEach(ticket => {
        const priorityLabel = getPriorityLabel(ticket.priority);
        if (!grouped[priorityLabel]) {
          grouped[priorityLabel] = [];
        }
        grouped[priorityLabel].push(ticket);
      });
    }
    return grouped;
  };

  // Helper function for sorting tickets
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const groupedTickets = groupTickets();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Backlog':
        return backlogIcon;
      case 'In progress':
        return inProgressIcon;
      case 'Todo':
        return toDoIcon;
      default:
        return null;
    }
  };

  return (
    <main className="kanban-board">
      {Object.keys(groupedTickets).map(group => (
        <div key={group} className="kanban-column">
          <div className="kanban-column-header">
            <div className="header-left">
              <img src={getStatusIcon(group)} alt="status" className="status-icon" />
              <h2>{group}</h2>
              <span className="count">{groupedTickets[group].length}</span>
            </div>
            
            <div className="header-right">
            <img src={addIcon} alt="add" className="add-icon" />
              <img src={menuIcon} alt="menu" className="menu-icon" />
              {/* <img src={addIcon} alt="add" className="add-icon" /> */}
            </div>
          </div>
          <div className="kanban-column-content">
            {sortTickets(groupedTickets[group]).map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}

// Helper function to get priority label
export function getPriorityLabel(priority) {
  const PRIORITY_MAP = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
  };
  return PRIORITY_MAP[priority] || 'No priority';
}

export default KanbanBoard;
