import { supabase } from '../../lib/initSupabase';
import { Alert } from 'react-native';




export const handleLogin = async (email: string, password: string) => {
  
const { error, user } = await supabase.auth.signIn({ email, password })

  if (!error && !user) Alert.alert('Check your email for the code');
// if (error) Alert.alert(error.message);
if (error) {
Alert.alert(error.message);
} else {

// verify OTP
 
}
};
export const handleSignup = async (email: string, password: string, navigation) => {
// submit OTP token with email

    try {
    const { data, error, status } = await supabase
    .from('profiles')
    .select(`email`)
    .eq('email', email)
    .single();
    if (error && status !== 406) {
        Alert.alert(error.message);
        throw error;
      }
    
      if (data) {
        Alert.alert(
          'Email already exists. If you have not finished entering token, login and enter the token.'
        );
        return;
      }
    } catch (error: any) {
      Alert.alert(error.message);
      throw error;
    }
    try {
    const { error, user } = await supabase.auth.signUp({ email, password })
  } catch (error: any) {
    Alert.alert(error.message);
    throw error;
  } finally 
  {
    navigation.navigate('OTP', {email})
  }

};


export const handleToken = async (email: string, token: string, navigation) => {
// submit OTP token with email
console.log('yo', email, token, navigation)
const { session, error } = await supabase.auth.verifyOTP({
email,
token,
type: 'signup',
});
if (error) Alert.alert(error.message);
};

export const handlePasswordReset = async (email: string, navigation) => {
// submit forget password request
console.log('yo', email, navigation)
try {
const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
if (error) {
Alert.alert(error.message);
throw error;
}
} catch (error: any) {
Alert.alert(error.message);
throw error;
} finally {
navigation.navigate('Login'); 
}
};