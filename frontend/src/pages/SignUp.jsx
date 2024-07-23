import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const SignUp = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [name, setName]= useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');
   const [successMessage, setSuccessMessage] = useState('');
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         setError('Passwords do not match');
         return;
      }
      try {
         const response = await axios.post('http://localhost:3000/auth/signup', { username, email, password, repassword: confirmPassword, name});
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

   return (
      <StyledContainer>
         <div className="outer--container">
            <div className="card--container">
               <div className="signup-header">
                  <h2>Sign Up</h2>
               </div>
               <form className="signup-form" onSubmit={handleSubmit}>
                  <div className="input-group">
                     <label htmlFor="username">Username</label>
                     <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </div>
                  <div className="input-group">
                     <label htmlFor="name">Full Name</label>
                     <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </div>
                  <div className="input-group">
                     <label htmlFor="email">Email</label>
                     <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>
                  <div className="input-group">
                     <label htmlFor="password">Password</label>
                     <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
                  <div className="input-group">
                     <label htmlFor="confirmPassword">Confirm Password</label>
                     <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                     />
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  {successMessage && <div className="success-message">{successMessage}</div>}
                  <button type="submit">Sign Up</button>
                  <button type="button" className="google-button" onClick={handleGoogleSignUp}>
                     Continue with Google
                  </button>
               </form>
               <button className="login-button" onClick={() => navigate('/login')}>
                  Back to Login
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
      max-width: 400px;
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

         .signup-header {
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

         .signup-form {
            width: 100%;
            display: flex;
            flex-direction: column;

            .input-group {
               display: flex;
               flex-direction: column;
               margin-bottom: 15px;

               label {
                  margin-bottom: 5px;
                  color: #ffffff;
               }

               input {
                  padding: 10px;
                  border: none;
                  border-radius: 5px;
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

         .login-button {
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

export default SignUp;
