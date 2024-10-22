import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Add necessary CSS for styling
import KanbanBoard from './Components/KanbanBoard';
import GroupSelector from './Components/GroupSelector';

// Utility function to fetch data from API
const fetchTickets = async () => {
  try {
    const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
    console.log(response)
    return response.data.tickets;
     // Ensure correct data extraction
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
    // console.log(response)
    return response.data.users;
     // Ensure correct data extraction
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// Main App Component
function App() {
  const [tickets, setTickets] = useState([]);
  const [users,setUsers]=useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('grouping') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sorting') || 'priority');
  const [showDisplayMenu, setShowDisplayMenu] = useState(false);
  // Fetch tickets on component mount
  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchTickets();
      setTickets(Array.isArray(data) ? data : []); // Ensure tickets is an array
    };
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(Array.isArray(data) ? data : []); // Ensure users is an array
    };
    getTickets();
    getUsers();
  }, []);

  // Store grouping and sorting preferences in localStorage
  useEffect(() => {
    localStorage.setItem('grouping', groupBy);
    localStorage.setItem('sorting', sortBy);
  }, [groupBy, sortBy]);
 console.log(tickets);
 console.log("user data",users);
  return (
    <div className="App">
      <header className="header">
        {/* <h1>Interactive Kanban Board</h1> */}
        <GroupSelector
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showDisplayMenu={showDisplayMenu}
          setShowDisplayMenu={setShowDisplayMenu}
        />
      </header>
      
      <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;
