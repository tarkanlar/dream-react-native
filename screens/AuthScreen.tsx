import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm  from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import OTPForm  from '../components/Auth/OTPForm';
import ResetPasswordForm from '../components/Auth/ResetPasswordForm';

import { AuthStackScreenProps } from '../types';

function LoginScreen({ navigation,
}: AuthStackScreenProps<'Login'>) {
  return (
    <>
    <LoginForm navigation={ navigation } />
     </>
  );
}

function SignupScreen({ navigation, 
}: AuthStackScreenProps<'Signup'>) {
  return (
    <>
    <SignupForm navigation={navigation}/>
</>
  );
}

function OTPScreen({ route, navigation, 
}: AuthStackScreenProps<'OTP'>) {
  return (
    <>
    <OTPForm route={route} navigation={navigation}/>
</>
  );
}
function ResetPasswordScreen({ route, navigation, 
}: AuthStackScreenProps<'ResetPasword'>) {
  return (
    <>
    <ResetPasswordForm route={route} navigation={navigation}/>
</>
  );
}



const Stack = createStackNavigator();

export default function AuthScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
