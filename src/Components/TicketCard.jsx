import React from 'react';
import highPriorityIcon from '../assets/icons_FEtask/Img - High Priority.svg';
import mediumPriorityIcon from '../assets/icons_FEtask/Img - Medium Priority.svg';
import lowPriorityIcon from '../assets/icons_FEtask/Img - Low Priority.svg';

function TicketCard({ ticket }) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
      case 3:
        return highPriorityIcon;
      case 2:
        return mediumPriorityIcon;
      case 1:
        return lowPriorityIcon;
      default:
        return null;
    }
  };

  const priorityIcon = getPriorityIcon(ticket.priority);

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="avatar">
          {ticket.assignedUser && <img src="/api/placeholder/24/24" alt={ticket.assignedUser} className="avatar-img" />}
        </div>
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="tags">
        {priorityIcon && (
          <div className="tag">
            <img src={priorityIcon} alt="priority" className="priority-icon" />
          </div>
        )}
        <div className="tag">
          <span className="status-icon">{ticket.status}</span>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
