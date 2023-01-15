import React, { useEffect, useState, createContext, useContext } from 'react';
import { Session, User, ApiError } from '@supabase/supabase-js';
import { supabase } from '../lib/initSupabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignOut = async () => {
    try {
      await AsyncStorage.removeItem('@profile')
    } catch(e) {
      // remove error
    }
     await supabase.auth.signOut();
};


export const UserContext = createContext<{
  user: User | null;
  session: Session | null;
  profile: { username: string; website: string; avatar_url: string; };
}>({
  user: null,
  session: null,
  profile: {
    username: '',
    website: '',
    avatar_url: '',
  }
});


export const UserContextProvider = (props: any) => {

  const getProfileData = async () => {
    try {
      const profileData = await AsyncStorage.getItem('@profile')
      if(profileData !== null) {
       setProfile(JSON.parse(profileData));
      }
    } catch(e) {
      // error reading value
    }
  }
  
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ username: string; website: string; avatar_url: string; }>({
    username: '',
    website: '',
    avatar_url: '',
  });
  

  useEffect(() => {
    getProfileData();
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // console.log(`Supabase auth event: ${event}`);
        setSession(session);
        setUser(session?.user ?? null);
        if(event === 'SIGNED_IN'){
        getProfile(session?.user);
        }
      }
    );

    return () => {
      authListener!.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
 

  async function getProfile(user: User | null | undefined) {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile(data);
        storeProfileData(data);
      }
    } catch (error) {
      throw new Error((error as ApiError).message);
    } finally {

    }
  }
  const value = {
    session,
    user,
    profile
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};

export const storeProfileData = async (value: any) => {
  try {
    const profile = JSON.stringify(value)
    await AsyncStorage.setItem('@profile', profile);
  } catch (e) {
    // saving error
  }
}

// get profile data 
export const getProfileData = async () => {
  try {
    const profileData = await AsyncStorage.getItem('@profile')
    if(profileData !== null) {  
      return JSON.parse(profileData);
    } 
  } catch(e) {
    // error reading value
  }
}

export const updateProfileData = async (value: any) => {
  try {

    const profileData = await AsyncStorage.getItem('@profile')
    if(profileData !== null) {
     
      const profile = JSON.parse(profileData);
      console.log('profile', profile);
      const newProfile = {...profile, ...value}
      console.log('value', value);
      const newProfileString = JSON.stringify(newProfile);
      await AsyncStorage.setItem('@profile', newProfileString);
    }

  } catch (e) {
    // saving error
  }
}
