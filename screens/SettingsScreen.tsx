import { ScrollView, HStack, VStack, Text, Icon, useColorMode, Input, Stack, useToast, KeyboardAvoidingView, Center, Switch } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { PrimaryButton } from '../components/UI/Button';
import { useUser, storeProfileData, SignOut, updateProfileData } from '../components/UserContext';
import { RootTabScreenProps } from '../types';
import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import { Alert, View } from "react-native";
import { ApiError } from "@supabase/supabase-js";
import UploadImage from '../components/UploadImage';
import { Platform } from 'react-native';


export default function SettingsScreen({
  navigation,
}: RootTabScreenProps<'Settings'>) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, profile } = useUser();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [username, setUsername] = useState(profile.username);
  const [website, setWebsite] = useState(profile.website);
  const [avatar_url, setAvatar_url] = useState(profile.avatar_url);

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
      toast.show({
        description: 'Profile Updated!'
      })

    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView pt="10" px={4}>
        <VStack space={5} w="100%">
          <View>
            <Stack space={8} w="75%"  maxW="300px" mx="auto">
              <Center alignContent={"center"}>
              <UploadImage />
              </Center>
              <HStack alignItems="center" space={4}>
        <Text> Dark mode
            </Text>
          <Switch onToggle={toggleColorMode} isChecked={colorMode=='dark'} />
          </HStack>
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

            <VStack padding={10} space={8} alignItems="center">
              <PrimaryButton
                onPress={() => updateProfile({ username, website, avatar_url })}
                disabled={loading}
              >Update Profile</PrimaryButton>

              <PrimaryButton onPress={() => SignOut()}>Sign Out</PrimaryButton>
            </VStack>
          </View>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
