import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', { username, email, password, repassword: confirmPassword, name });
      if (response.status === 201) {
        setSuccessMessage('Sign up successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      console.error('Signup error:', err.response || err.message || err);
      setError(err.response?.data?.message || 'Some error occurred');
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const togglePasswordVisibility = (field) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field]
    }));
  };

  return (
    <StyledContainer>
      <div className="tagline-part">
        <h2 className='tagline-title'>
          Register Today.
        </h2>
        <p className='tagline-text'>
          Connect with everyone.
        </p>
      </div>
      <div className="card--container">
        <div className="signup-header">
          <h2>Sign Up</h2>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className='inputF'
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor='username'>Username</label>
          </div>
          <div className="input-group">
            <input
              className='inputF'
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor='name'>Full Name</label>
          </div>
          <div className="input-group">
            <input
              className='inputF'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor='email'>Email</label>
          </div>
          <div className="input-group">
            <input
              className='inputF'
              type={visibility.password ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor='password'>Password</label>
            <div className='eye' onClick={() => togglePasswordVisibility('password')}>
              <i className={visibility.password ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
            </div>
          </div>
          <div className="input-group">
            <input
              className='inputF'
              type={visibility.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <div className='eye' onClick={() => togglePasswordVisibility('confirmPassword')}>
              <i className={visibility.confirmPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          <button type="submit" className='sign-up'>Sign Up</button>
          <hr />
          <button type="button" className="google-button" onClick={handleGoogleSignUp}>
            <i className="fa-brands fa-google iconG"></i>Continue with Google
          </button>
        </form>
        <p>Already Registered?&nbsp;
          <button className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
        </p>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-evenly;
  align-items: center;
  background: linear-gradient(225deg, #FF6F61 50%, #00695C 50%);
  @media (max-width: 1000px){
   justify-content: center;
  }
  .tagline-part{
    color: white;
    width: 500px;
    .tagline-title{
      font-size: 60px;
   }
   .tagline-text{
      font-weight: 400;
      font-size: 22px;
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

    .signup-header {
      display: flex;
      flex-direction: column;
      h2 {
        text-decoration: underline;
        color: purple;
        margin-bottom: 15px;
      }
    }

    .signup-form {
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
          background: #f2f2f2;

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
      .error-message, .success-message {
        margin-bottom: 15px;
        text-align: center;
      }

      .error-message {
        color: #ff4d4d;
      }

      .success-message {
        color: #4caf50;
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

      .sign-up {
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

export default SignUp;
