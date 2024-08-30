import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { TypeAnimation } from 'react-type-animation';
import ForgotPasswordPopUp from "../components/ForgotPasswordPopup";

const Login = ({ onLoginSuccess }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [clickForgotPassword, setClickForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', { usernameOrEmail, password }, { withCredentials: true });
      if (response.data.success) {
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("token", response.data.token);
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
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleForgotPasswordClick = () => {
    setClickForgotPassword(true);
  };

  const closeForgotPasswordPopup = () => {
    setClickForgotPassword(false);
  };

  return (
    <StyledContainer style={clickForgotPassword ? { background: "linear-gradient(45deg, #78352f 50%, #173d39 50%)" } : {}}>
      <div className="tagline-part">
        <h2 className='tagline-title'>
          <span style={{ display: 'block' }}>
            Stay
          </span>
          <TypeAnimation
            sequence={[
              'Connected,',
              1000,
              'Chatting.',
              1000
            ]}
            wrapper="span"
            speed={50}
            style={{ display: 'inline-block' }}
            repeat={Infinity}
          />
        </h2>
        <p className='tagline-text'>
          stay connected with your friends.
        </p>
      </div>
      <div className="card--container">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className='inputF'
              type="text"
              id="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
            <label htmlFor='usernameOrEmail'>Username or Email</label>
          </div>
          <div className="input-group">
            <input
              className='inputF'
              type={visibility ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor='password'>Password</label>
            <div className='eye' onClick={handleClick}>
              <i className={visibility ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
            </div>
          </div>
          <span className='f-pass' onClick={handleForgotPasswordClick}>Forgot password?</span>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className='login'>Login</button>
          <hr />
          <button type="button" className="google-button" onClick={handleGoogleLogin}>
            <i className="fa-brands fa-google iconG"></i>Continue with Google
          </button>
        </form>
        <p>Not Registered?&nbsp;
          <button className="signup-button" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </p>
      </div>
      {clickForgotPassword && <ForgotPasswordPopUp onClose={closeForgotPasswordPopup} />}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: linear-gradient(45deg, #FF6F61 50%, #00695C 50%);
  @media (max-width: 1000px){
    justify-content: center;
  }
  .tagline-part{
    color: white;
    width: 500px;
    .tagline-title{
      font-size: 70px;
    }
    .tagline-text{
      font-weight: 400;
      font-size: 16px;
      text-align: right;
    }
    @media (max-width: 1000px){
      display: none;
    }
  }
  .card--container {
    max-width: 370px;
    width: 100%;
    padding: 25px 30px;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    background-color: #f2f2f2;

    .login-header {
      display: flex;
      flex-direction: column;
      h2 {
        text-decoration: underline;
        color: purple;
        margin-bottom: 15px;
      }
    }

    .login-form {
      position: relative;
      .input-group {
        width: 100%;
        height: 40px;
        position: relative;
        margin-top: 20px;
        display: flex;
        align-items: center;

        label {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          color: #919191;
          transition: top 0.2s, font-size 0.2s, color 0.2s;
          background-color: #f2f2f2;
          padding: 0 5px;
        }

        input {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          border: 1px solid #ccc;
          outline: none;
          padding: 10px;
          font-size: 16px;
          background: none;

          &:focus + label,
          &:valid + label {
            top: 0px;
            font-size: 12px;
            color: #333;
          }
        }

        .eye {
          position: absolute;
          right: 10px;
          cursor: pointer;
          i {
            color: #919191;
          }
        }
      }
      .f-pass {
        font-size: 10px;
        position: absolute;
        color: blue;
        cursor: pointer;
        right: 0;
        &:hover{
          text-decoration: underline;
        }
      }
      button {
        width: 100%;
        display: block;
        margin-top: 20px;
        height: 37px;
        background: #0f58c6;
        color: white;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 5px;
      }
      .login {
        margin-top: 40px;
        margin-bottom: 20px;
        letter-spacing: 1px;
        font-size: 18px;
      }
      .google-button {
        background-color: #DB4437;
        text-align: left;
        padding-left: 10px;
        font-size: 16px;
        .iconG {
          margin-right: 10px;
        }
      }
    }
    p {
      font-size: 12px;
      margin-top: 10px;
      text-align: center;

      button {
        outline: none;
        border: none;
        font-size: 12px;
        color: blue;
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
`;

export default Login;
