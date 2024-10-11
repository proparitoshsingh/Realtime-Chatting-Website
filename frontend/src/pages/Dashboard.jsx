import { useEffect, useState } from 'react';
import ChatSection from '../components/ChatSection';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [isChat, setIsChat]= useState(false);
  const [chatId, setChatId] = useState('');

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
          <Sidebar username={username} token={token} setChatId={setChatId} setIsChat={setIsChat} />
          {isChat ? (
            <ChatSection username={username} token={token} chat_id={chatId}/>
          ) : (
            <div className="no-chat">
              <p>Lets talk to someone!</p>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  noChat: {
    width: '60vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    fontSize: '24px',
    color: '#888',
    borderRadius: '12px',
  },
};

export default Dashboard;
