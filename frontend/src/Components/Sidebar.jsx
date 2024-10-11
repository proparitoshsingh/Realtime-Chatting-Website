import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import profilePic from '../assets/profile.png';
import Navbar from './Navbar';
import ContactsSec from './ContactsSec';

const Sidebar = ({ username, token, setChatId, setIsChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${username}/chats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChats(response.data.chats);
        console.log('Chats :', response.data.chats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [username, token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <StyledContainer>
      <div className='outer--container'>
        <div className='card--container'>
          <img src={profilePic} alt="profile pic" />
          <div className='user--info'>
            <h2 className='user--name'>{username}</h2>
            <p className='more--info'>Account info</p>
          </div>
          <div className='search--icon'>
            <i className="fa-solid fa-magnifying-glass" style={{ color: '#d1d1d1' }}></i>
          </div>
        </div>
        <Navbar />
        <h4 className="msg">Messages</h4>
        <ContactsSec chats={chats} setChatId={setChatId} setIsChat={setIsChat} />
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 40vw;
  height: 100dvh;
  padding: 20px;
  color: white;
  background-color: #576cbc;

  .outer--container {
    height: 100%; 
    display: flex;
    flex-direction: column;
    background-color: #19376d;
    border-radius: 12px;
    padding: 18px;

    .card--container {
      display: flex;
      align-items: center;
      padding: 5px;
      background-color: #19376d;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
      }

      .user--info {
        margin-left: 10px;
        flex: 1;
        min-width: 0;

        h2.user--name {
          font-size: 18px;
          cursor: pointer;
        }

        p.more--info {
          font-size: 14px;
          cursor: pointer;
        }

        h2.user--name, p.more--info {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
        }
      }

      .search--icon {
        margin-left: auto;
        font-size: 20px;
        padding-right: 5px;
        padding-left: 5px;
        cursor: pointer;
      }
    }

    h4.msg {
      font-size: 12px;
      font-weight: 200;
      border-bottom: 1px solid #ffffffb1;
      margin-bottom: 10px;
    }
  }
`;

export default Sidebar;
