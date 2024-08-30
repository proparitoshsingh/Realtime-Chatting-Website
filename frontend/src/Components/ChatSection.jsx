import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import profilePic from '../assets/profile.png';

const curr_user = 'paritoshsingh';
const messages = [
   {
      id: 1,
      name: 'Karan',
      time: '01:34 PM',
      content: "Deepak is my best friend",
      sender: 'karanSrestha',
   },
   {
      id: 2,
      name: 'Mohit',
      time: '01:34 PM',
      content: 'Dholi taro dhol baje',
      sender: 'mohitSahoo',
   },
   {
      id: 3,
      name: 'Manjeet',
      time: '01:34 PM',
      content: "Placement lag gyiiii hurrrayyyy",
      sender: 'manjeetSingh',
   },
   {
      id: 4,
      name: 'Paritosh',
      time: '01:34 PM',
      content: "tuta hua saaz hu main",
      sender: 'paritoshsingh',
   },
];

const ChatSection = ({ username , token}) => {


   const [newMessage, setNewMessage] = useState('');
   const [showMenu, setShowMenu] = useState(false);
   const menuRef = useRef(null);
   const menuButtonRef = useRef(null);

   useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
         document.removeEventListener('mousedown', handleOutsideClick);
      };
   }, [showMenu]);

   const toggleMenu = () => {
      setShowMenu(!showMenu);
   };

   const handleOptionClick = (option) => {
      console.log('The selected option is : ', option);
      setShowMenu(false);
   };

   const handleOutsideClick = (event) => {
      if (
         showMenu &&
         !menuRef.current.contains(event.target) &&
         !menuButtonRef.current.contains(event.target)
      ) {
         setShowMenu(false);
      }
   };

   return (
      <StyledContainer>
         <div className="outer--container">
            <div className="card--container">
               <div className="chat-header">
                  <img src={profilePic} alt="profile pic" />
                  <h2>KV United</h2>
                  <span className="material-symbols-outlined chat-menu" onClick={toggleMenu} ref={menuButtonRef}>menu</span>
                  {showMenu && (
                     <div className="popup-menu" ref={menuRef}>
                        <div className="option" onClick={() => handleOptionClick('Notification Preference')}>
                           Notification Preference
                        </div>
                        <div className="option" onClick={() => handleOptionClick('View Description')}>
                           View Description
                        </div>
                        <div className="option" onClick={() => handleOptionClick('Delete Conversation')}>
                           Delete Conversation
                        </div>
                     </div>
                  )}
               </div>
               <div className="chat-messages">
                  {messages.map((msg) => (
                     <div
                        key={msg.id}
                        className={`message ${msg.sender === curr_user ? 'own' : 'other'}`}
                     >
                        <div className="message-info">
                           <span className="message-name">{`${msg.sender === curr_user ? 'You' : msg.name}`}</span>
                           <span className="message-time">{msg.time}</span>
                        </div>
                        <div className="message-text">{msg.content}</div>
                     </div>
                  ))}
               </div>
               <div className="chat-input">
                  <input
                     type="text"
                     placeholder="Type your message..."
                     value={newMessage}
                     onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button>Send</button>
               </div>
            </div>
         </div>
      </StyledContainer>
   );
};

const StyledContainer = styled.div`
   width: 60vw;
   height: 100vh;
   padding: 20px;
   background-color: #2E236C;

   .outer--container {
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: #17153B;
      border-radius: 12px;
      padding: 18px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

   .card--container {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: #1a366b;
      border-radius: 12px;

      img {
         width: 40px;
         height: 40px;
         border-radius: 50%;
         cursor: pointer;
      }

      .chat-header {
         padding: 20px;
         background-color: #ffffff;
         border-bottom: 1px solid #ddd;
         display: flex;
         justify-content: flex-end;
         align-items: center;

         h2 {
            margin-left: 20px;
            font-size: 1.5rem;
         }
         .chat-menu{
            margin-left: auto;
            cursor: pointer;
            color: #888;
         }

         .popup-menu {
            position: absolute;
            top: 100px;
            right: 20px;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            z-index: 1;
            display: flex;
            flex-direction: column;
            padding: 8px;
         }

         .option {
            padding: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
            font-size: 1rem;

            &:hover {
               background-color: #f5f5f5;
            }
         }
      }

      .chat-messages {
         flex: 1;
         padding: 20px;
         overflow-y: auto;
         background-color: #f5f5f5;
         display: flex;
         flex-direction: column;
      }

      .message {
         display: inline-block;
         max-width: 70%;
         margin-bottom: 20px;
         padding: 10px;
         border-radius: 10px;
         background-color: #fff;
         box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

         &.own {
            background-color: #4B70F5;
            color: #ffffff;
            align-self: flex-end;
            text-align: right;
            
            .message-time {
            font-size: 0.8rem;
            color: #ffffff;
            }
         }

         &.other {
            background-color: #fff;
            align-self: flex-start;
            text-align: left;
            
            .message-time {
            font-size: 0.8rem;
            color: #888;
            }
         }

         .message-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
         }

         .message-name {
            font-weight: bold;
         }

         

         .message-text {
            font-size: 1rem;
            word-wrap: break-word;
         }
      }
         .chat-input {
         display: flex;
         align-items: center;
         padding: 10px;
         background-color: #ffffff;
         border-top: 1px solid #ddd;
         border-radius: 0 0 12px 12px;

         input[type="text"] {
            flex: 1;
            padding: 8px;
            margin-left:30px;
            margin-right: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
         }

         button {
            padding: 8px 16px;
            margin-right: 18px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;

         &:hover {
            background-color: #45a049;
         }
      }
   }
}
`;

export default ChatSection;
