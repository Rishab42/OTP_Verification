import './App.css';
import {Link} from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react';

function Verify() {

  const [otp, setOtp] = useState('      ');

  useEffect(() => {
    document.getElementById(`otp0`)?.focus();
  }, [])

  useLayoutEffect(() => {
    document.getElementById(`otp0`)?.focus();
  }, [])

  // this function sets the focus of the input based on the otp size.        
  const setFocus = (index) => {
    document.getElementById(`otp${index}`)?.focus();
  }

  // this function updates the otp 
  const updateOtp = (e, index) => {
    const val = parseInt(e.target.value);
    
    if(val < 0 && val > 9) return;
    // Special case for 'e', since e stands for another number.
    if(!val) return;
    const currentOtpDigits = otp.slice().split('');
    currentOtpDigits[index] = val;
    const newOtp = currentOtpDigits.join('');
    setOtp(newOtp);
    setFocus(index + 1);
  }

  const handleKeyPress = (e, index) => {
    if(e.keyCode === 8) {
      index -= 1;
      const currentOtpDigits = otp.slice().split('');
      currentOtpDigits[index + 1] =  ' ';
      const newOtp = currentOtpDigits.join('');
      setOtp(newOtp);
      document.getElementById(`otp${index}`)?.select();
    }

    // Left navigation
    if(e.keyCode === 37) {
      document.getElementById(`otp${index-1}`)?.select();
    }
    // Right Navigation
    if(e.keyCode === 39) {
      document.getElementById(`otp${index+1}`)?.select();
    }
  }

  const renderInputs = () => {
    const inputs = [];
    for(let i=0;i<=5;i++) {
      inputs.push(
        <input type="number" key={i} maxLength="1" onChange={(e) => updateOtp(e, i)} onKeyDown={(e) => handleKeyPress(e, i)} value={otp?.[i]} id={`otp${i}`}/>
      )
    }
    return inputs;
  }

  return (
    <div className="container">
      <div className="content">
        <div className="Line1"><h1>Phone Verification</h1></div>
        <hr />
        <div className="text">Enter the OTP you received on 12345-XXXXX</div>
        <div className="otp">
          {renderInputs()}
        </div>
        <div className="options">
          <span className="change"><p>Change Number</p></span>
          <span className="resend"><p>Re-send OTP</p></span>
        </div>
        <div className="verify-btn"><button>Verify Phone Number</button></div>
      </div>
    </div>
  );
}

export default Verify;
