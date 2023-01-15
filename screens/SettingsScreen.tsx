import { ScrollView, VStack, Text, Icon, useColorMode, Input, Stack } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { PrimaryButton } from '../components/UI/Button';
import { useUser, storeProfileData, SignOut, updateProfileData } from '../components/UserContext';
import { RootTabScreenProps } from '../types';
import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import { Alert, View } from "react-native";
import { ApiError } from "@supabase/supabase-js";
import UploadImage from '../components/UploadImage';

export default function SettingsScreen({
  navigation,
}: RootTabScreenProps<'Settings'>) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user,profile } = useUser();
  const [loading, setLoading] = useState(false);
 
  const [username, setUsername] = useState(profile.username);
  const [website, setWebsite] = useState(profile.website);
  const [avatar_url, setAvatar_url] = useState(profile.avatar_url);

// create unUpdateProfileData function
  const onUpdateProfileData = async () => {
    console.log('updateProfileData');
    try {
      setLoading(true);
      if (!user) throw new Error("No user on the session!");
      updateProfileData ({ username: 'kuku'});
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setLoading(false);
      console.log(profile);
    }
  };

  
  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      storeProfileData({ username, website, avatar_url });
      setLoading(false);

    }
  }

  return (
    <ScrollView pt="10" px={4}>
      <VStack space={5} w="100%">
        <PrimaryButton
          w="150"
          onPress={toggleColorMode}
          rightIcon={
            <Icon
              as={<FontAwesome5 name={colorMode === 'dark' ? 'sun' : 'moon'} />}
              size={5}
            />
          }
        >
          <Text fontSize="md" color="white">
            {colorMode === 'dark' ? 'Light' : 'Dark'} mode
          </Text>
        </PrimaryButton>
        <PrimaryButton
          w="150"
          onPress={() => navigation.navigate('ModalEditProfile')}
          rightIcon={
            <Icon as={<FontAwesome5 name="user-edit" />} size={5} minW="7" />
          }
        >
          Edit Profile
        </PrimaryButton>
        <PrimaryButton onPress={() => SignOut()}>Sign Out</PrimaryButton>
        <PrimaryButton onPress={() => onUpdateProfileData()}>Update Profile Data</PrimaryButton>

        <View>
        <Stack space={6} w="75%" maxW="300px" mx="auto">
        <UploadImage/>

        <Input size="xl" label="Email" value={user?.email} disabled />


        <Input
        size="xl"
          label="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
        />


        <Input
        size="xl"
          label="Website"
          value={website || ""}
          onChangeText={(text) => setWebsite(text)}
        />
      </Stack>

      <View>
        <PrimaryButton
          onPress={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >Update Profile</PrimaryButton>
      </View>
    </View>
      </VStack>
    </ScrollView>
  );
}
