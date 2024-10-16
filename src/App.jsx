import React, { useState } from 'react';
import './App.css';
import Messages from './components/Messages/Messages.component';
import SideBar from './components/SideBar/SideBar.component';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import Menu Icon

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Sidebar starts open by default

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar component */}
      {isSidebarOpen && <SideBar />}
      
      <div style={{ paddingLeft: isSidebarOpen ? '280px' : '50px', transition: 'padding-left 0.3s ease' }}>
        <Messages />
      </div>

      {/* Three-dot icon for toggling the sidebar */}
      <IconButton
        onClick={toggleSidebar}
        style={{ position: 'fixed', top: '10px', left: isSidebarOpen ? '280px' : '10px', zIndex: 1000 }}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}

export default App;
