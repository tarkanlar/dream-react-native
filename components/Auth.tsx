import { useState, useRef, useEffect } from 'react';

import { StatusBar, useColorMode } from 'native-base';

import { Center } from 'native-base';

import { ForgetPassword } from './Auth/ForgetPassword';

import { handleLogin, handleToken, handleSignup } from './Auth/AuthHelper';

import { OTPform } from './Auth/OTPform';
import { SignupForm } from './Auth/SignupForm';

export default function Auth() {

  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [otpEmail, setOtpEmail] = useState<string>('');
  const [showForget, setShowForget] = useState<boolean>(false);
  const mountedRef = useRef(true);



  const { colorMode } = useColorMode();

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      {!showOtp && (
        <SignupForm handleSignup={handleSignup} setShowOtp={setShowOtp} />
      )}
      {showOtp && (
        <OTPform handleToken={handleToken} otpEmail={otpEmail} />
        
      )}
      {showForget && (
        <Center>
          <ForgetPassword />
        </Center>
      )}
    </>
  );
}
