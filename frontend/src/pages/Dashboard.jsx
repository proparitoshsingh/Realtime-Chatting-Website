import { useEffect, useState } from 'react';
import ChatSection from '../components/ChatSection';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [isChat, setChat]= useState(false);
  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');
    if (storedUsername && storedToken) {
      setUsername(storedUsername);
      setToken(storedToken);
    } else {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="container">
      {username && token ? (
        <>
          <Sidebar username={username} token={token} />
          <ChatSection username={username} token={token} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
