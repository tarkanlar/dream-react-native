import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm  from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import { OTPform } from '../components/Auth/OTPform';

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

function OTPScreen({ navigation, 
}: AuthStackScreenProps<'OTP'>) {
  return (
    <>
    <OTPform navigation={navigation}/>
</>
  );
}


const Stack = createStackNavigator();

export default function AuthScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
