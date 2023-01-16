import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/initSupabase';
import { useUser, updateProfileData, getProfileData } from './UserContext';
import * as MediaLibrary from 'expo-media-library';


export default function UploadImage() {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const { user, profile } = useUser();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();


  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    uploadAvatar(_image)
    if (!_image.cancelled) {
      setAvatarUrl(_image.uri);
    }
  }
  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      requestPermission();
    } else {
      console.log('Media Permissions are granted')
    }
  }
  async function profileData() {
    try {
      await getProfileData();
    }
    catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkForCameraRollPermission()
    profileData()

    downloadImage(profile.avatar_url)
  }, [profile]);


  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }
  async function uploadAvatar(file) {
    try {
      setUploading(true)
      if (!file.uri || file.uri.length === 0) {
        throw new Error('You must select an image to upload.')
      }
      const fileExt = file.uri.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      const fileOptions = { contentType: 'image/jpeg' }
      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, fileOptions)

      if (uploadError) {
        throw uploadError
      }
      console.log(`Upload successful. File available at: ${filePath}`)
      onUpload(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }
  async function onUpload(filePath) {
    try {
      setUploading(true);
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        avatar_url: filePath,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    } finally {

      updateProfileData({ avatar_url: filePath });
      // this works but if you update from webapp it doesn't update the avatar because the profile date is not upto date
      setUploading(false);

    }
  }

  return (
    <View>
      <View style={imageUploaderStyles.container}>
        {
          avatarUrl && <Image source={{ uri: avatarUrl }} style={{ width: 100, height: 100 }} />
        }
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
            <AntDesign name="camera" size={20} color="black" />

          </TouchableOpacity>
        </View>
        <View>

        </View>
      </View>
    </View>
  );
}
const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 100,
    width: 100,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
  }
})