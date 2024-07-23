import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import profilePic from '../assets/profile.png';

const Login = ({ onLoginSuccess }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', { usernameOrEmail, password }, { withCredentials: true });
      if (response.data.success) {
        console.log('Navigating to /dashboard');
        onLoginSuccess();
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Login failed');
    }
  };
  const handleClick = () => {
    setVisibility(!visibility);
  }

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };
  return (
    <StyledContainer>
      <div className="outer--container">
        <div className="card--container">
          <div className="login-header">
            <img src={profilePic} alt="profile pic" />
            <h2>Login</h2>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="usernameOrEmail">Username or Email</label>
              <input
                type="text"
                id="usernameOrEmail"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type={visibility?"text":"password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='eye' onClick={handleClick}>
                <i className={visibility?"fa-solid fa-eye-slash":"fa-solid fa-eye"}></i>
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Login</button>
            <button type="button" className="google-button" onClick={handleGoogleLogin}>
              Continue with Google
            </button>
          </form>
          <button className="signup-button" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </div>
      </div>
    </StyledContainer>
  );
};


const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2e236c;

  .outer--container {
    width: 100%;
    max-width: 30vw;
    padding: 20px;
    background-color: #17153b;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .card--container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #1a366b;
      border-radius: 12px;
      padding: 20px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      .login-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;

        h2 {
          margin-top: 10px;
          font-size: 1.5rem;
          color: #ffffff;
        }
      }

      .login-form {
        width: 100%;
        display: flex;
        flex-direction: column;

        .input-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          position: relative;

          label {
            margin-bottom: 5px;
            color: #ffffff;
          }

          input {
            padding: 10px;
            border: none;
            border-radius: 5px;
            position: relative;
          }
          .eye{
            position: absolute;
            right: 0;
            top: 50%;
            margin: 2px 10px;
            cursor: pointer;
          }
        }

        .error-message {
          color: #ff4d4d;
          margin-bottom: 15px;
          text-align: center;
        }

        button {
          padding: 10px;
          margin-bottom: 10px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: #45a049;
          }
        }
          .google-button {
          background-color: #db4437;
          margin-top: 10px;

          &:hover {
            background-color: #c33d2e;
          }
        }
      }

      .signup-button {
        padding: 10px;
        width: 100%;
        background-color: #4b70f5;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #3a57d5;
        }
      }
    }
  }
`;

export default Login;
