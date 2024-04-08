import { useState } from 'react';
import './style.css';

function Chatcont() {
  const participants = ['Jayant', 'Himani', 'Paritosh'];
  const messages = [
    { sender: 'Jayant', message: 'Hey, how\'s it going?' },
    { sender: 'You', message: 'Hey, how\'s it going?' },
    { sender: 'Jayant', message: 'Hey, how\'s it going?' },
    { sender: 'You', message: 'Hey, how\'s it going?' }, { sender: 'Jayant', message: 'Hey, how\'s it going?' },
    { sender: 'You', message: 'Hey, how\'s it going?' }, { sender: 'Jayant', message: 'Hey, how\'s it going?' },
    { sender: 'You', message: 'Hey, how\'s it going?' }, { sender: 'Jayant', message: 'Hey, how\'s it going?' },
    { sender: 'You', message: 'Hey, how\'s it going?' },
    { sender: 'Himani', message: 'Not bad' }
  ];
  const [showBubble, setShowBubble] = useState(false);

  const renderChatMessages = () => {
    return messages.map((msg, index) => (
      <div key={index} className={`flex flex-col mb-2 ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
        <p className="text-sm font-semibold text-gray-600">{msg.sender}</p>
        <div className={`rounded-lg p-3 max-w-md ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-300 '}`}>
          {msg.message}
        </div>
      </div>
    ));
  };

  const handleBubbleHover = (bool) => {
    setShowBubble(bool);
  };

  return (
    <div className="flex items-center justify-center h-screen relative">
      {/*Bubble button */}
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-lg"
        onMouseEnter={() => handleBubbleHover(true)}
        onMouseLeave={() => handleBubbleHover(false)}
      >
        Total - {participants.length} Participants
      </button>

      {/*Bubble */}
      {showBubble && (
        <div className="absolute top-12 right-4 bg-gray-700 text-white px-4 py-2 rounded-lg opacity-90 transition-opacity duration-300 hover:opacity-100">
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col h-3/4 w-3/4 rounded-lg p-2 container">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Chat Room</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">Leave</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-lg">Logout</button>
          </div>
        </div>

        {/*Chat messages */}
        <div className="flex-1 overflow-y-auto bg-gray-200 p-4">
          {renderChatMessages()}
        </div>

        <button className="absolute left-1/2 bottom-1/4 h-12 w-12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md opacity-90 hover:opacity-100">
          <svg className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>


        {/*input and send button */}
        <div className="bg-gray-300 p-4 flex items-center justify-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-3/4 p-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button className="bg-blue-500 text-white mx-2 px-3 py-2 rounded-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatcont;
