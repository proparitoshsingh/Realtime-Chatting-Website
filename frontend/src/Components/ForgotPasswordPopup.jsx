import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const ForgotPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stage, setStage] = useState(1); // 1 for email input, 2 for OTP input

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/forget-password/generate-otp", { email });
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setMsg(response.data.message);
        setStage(2); // Move to OTP input stage
      }
    } catch (error) {
      setError('An error occurred while sending OTP');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setError("Password and confirm password must be same");
      return;
    }
    const response = await axios.post("http://localhost:3000/forget-password/verify-otp", { email , otp , newPassword});
    if(response.data.error){
      setError(response.data.error)
    }else{
      setMsg(response.data.message);
    }
    console.log('OTP Submitted:', otp);
    console.log('Password Changed Success');
  };

  return (
    <StyledContainer>
      <button className='cross' onClick={onClose}>X</button>
      <FormContainer onSubmit={stage === 1 ? handleEmailSubmit : handleOtpSubmit}>
        {stage === 1 ? (
          <SlideIn>
            <h2>Enter email to reset your password.</h2>
            <div className="inputField">
              <label htmlFor="email">Email</label>
              <input id="email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
              {msg && <div style={{color: "green"}}>{msg}</div>}
          </SlideIn>
        ) : (
          <SlideIn>
            <h2>Enter the OTP sent to your email.</h2>
            <div className="inputField">
              <label htmlFor="password">Password</label>
              <input id="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="inputField">
              <label htmlFor="cPassword">Confirm Pasword</label>
              <input id="cPassword" required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="inputField">
              <label htmlFor="otp">OTP</label>
              <input id="otp" required type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </div>
              {msg && <div style={{color: "green"}}>{msg}</div>}
          </SlideIn>
        )}
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button className="otp" type="submit">{stage === 1 ? 'Send OTP' : 'Verify OTP'}</button>
      </FormContainer>
    </StyledContainer>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SlideIn = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const StyledContainer = styled.div`
  background-color: white;
  max-width: 400px;
  width: 100%;
  position: absolute;
  box-shadow: 0 0 10px black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px 27px;
  button.cross {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background: none;
    outline: none;
    border: none;
    &:hover {
      background: red;
      color: white;
      cursor: pointer;
    }
  }
  h2 {
    text-align: center;
    font-size: 16px;
    margin-bottom: 25px;
  }
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .inputField {
    width: 100%;
    height: 37px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    label {
      position: absolute;
      color: #9a9a9a;
      margin-left: 10px;
    }
    input {
      height: 100%;
      width: 100%;
      border-radius: 4px;
      border: 2px solid #9a9a9a;
      outline: none;
      padding: 0 10px;
    }
  }
  button.otp {
    background-color: #1c5be3;
    color: white;
    display: block;
    border: none;
    outline: none;
    margin-top: 20px;
    height: 37px;
    border-radius: 4px;
    padding: 0 25px;
    font-size: 18px;
    cursor: pointer;
  }
`;

export default ForgotPasswordPopup;
