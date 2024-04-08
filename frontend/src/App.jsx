import { useState } from 'react'; // Correct import statement
import './App.css';
import Login from './components/login/Login';
import Chatcont from './components/chatcont/Chatcont';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className='h-screen w-screen'>
      {isLoggedIn ? <Chatcont /> : <Login />}
    </div>
  );
}

export default App;
