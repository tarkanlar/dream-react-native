import { supabase } from '../../lib/initSupabase';
import { Alert } from 'react-native';


export const handleLogin = async (email: string, password: string) => {
console.log(email, password);
const { error, user } = await supabase.auth.signIn({ email, password })

  if (!error && !user) Alert.alert('Check your email for the code');
// if (error) Alert.alert(error.message);
if (error) {
Alert.alert(error.message);
} else {
// verify OTP

}
};
export const handleSignup = async (email: string, password: string) => {
// submit OTP token with email
    try {
    const { data, error, status } = await supabase
    .from('profiles')
    .select(email)
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
    const { error, user } = await supabase.auth.signUp({ email, password });

};


export const handleToken = async (email: string, token: string) => {
// submit OTP token with email
const { session, error } = await supabase.auth.verifyOTP({
email,
token,
type: 'signup',
});
if (error) Alert.alert(error.message);
};

export const handleForget = async (email: string) => {
// submit forget password request
const { error } = await supabase.auth.api.resetPasswordForEmail(email);
if (error) Alert.alert(error.message);
};