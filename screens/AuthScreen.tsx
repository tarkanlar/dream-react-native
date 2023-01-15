import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginForm } from '../components/Auth/LoginForm';
import { SignupForm } from '../components/Auth/SignupForm';
import { handleLogin, handleSignup } from '../components/Auth/AuthHelper';
import { AuthStackScreenProps } from '../types';

function LoginScreen({ navigation,
}: AuthStackScreenProps<'Login'>) {
  return (
    <>
    <LoginForm handleLogin={handleLogin}  navigation={navigation}/>
        </>
  );
}

function SignupScreen({ navigation, 
}: AuthStackScreenProps<'Signup'>) {
  return (
    <>
    <SignupForm handleSignup={handleSignup}  />

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
