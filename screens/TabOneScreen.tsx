import { RootTabScreenProps } from '../types';
import React, { useState } from "react";
import { StatusBar, Center, Heading, Text, View, ScrollView, KeyboardAvoidingView, useToast } from 'native-base';
import { Platform } from "react-native";
import { PrimaryButton } from '../components/UI/Button';
import { SecondaryInput } from '../components/UI/Input';
import { API_URL } from '../lib/constants';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [gender, setGender] = useState("man");
  const [age, setAge] = useState(30);
  const [priceMin, setPriceMin] = useState(25);
  const [priceMax, setPriceMax] = useState(100);
  const [hobbies, setHobbies] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");
  const toast = useToast();
  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const response = await fetch(`${API_URL}/generate-gifts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (e) {
      toast.show({
        description: "Couldn't generate ideas" + e.message,
      })
    } finally {
      setLoading(false);
    }
  };

  const onTryAgain = () => {
    setResult("");
  };
  if (loading) {
    return (
      <Center>
        <Text fontSize='lg'>Looking for the best gift ideas 🎁 💡</Text>
      </Center>
    );
  }

  if (result) {
    return (
      <Center px={2} py={2} flex={1}>
      <Heading>Here are some great gift ideas 🎁 💡</Heading>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'default'}
      />
   
    
        <Text fontSize='sm'>{result}</Text>
        <PrimaryButton
                  isLoading={loading}
                  isLoadingText="loading"
                  onPress={() => onTryAgain()}
                >
                  Try again
                </PrimaryButton>
      </Center>
    );
  }

  return (
    <Center px={2} py={2} flex={1}>
    <Heading>Generate gift ideas 🎁 💡</Heading>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View>
          <PrimaryButton
                  isDisabled={gender === "man"}
                  isLoadingText="Submitting"
                  onPress={() => setGender("man")}
                >
                  Man
                </PrimaryButton>
                <PrimaryButton
                  isDisabled={gender === "Woman"}
                  isLoadingText="Submitting"
                  onPress={() => setGender("Woman")}
                >
                  Woman
                </PrimaryButton>
          </View>

          <SecondaryInput
            placeholder="Age"
            keyboardType="numeric"
            value={age.toString()}
            onChangeText={(s) => setAge(Number.parseInt(s))}
          />

          <SecondaryInput
            placeholder="Price from"
            keyboardType="numeric"
            value={priceMin.toString()}
            onChangeText={(s) => setPriceMin(Number.parseInt(s))}
          />

          <SecondaryInput
            placeholder="Price to"
            keyboardType="numeric"
            value={priceMax.toString()}
            onChangeText={(s) => setPriceMax(Number.parseInt(s))}
          />

          <SecondaryInput
            placeholder="Hobbies"
            value={hobbies}
            onChangeText={setHobbies}
          />
            <PrimaryButton
                  isLoading={loading}
                  isLoadingText="Submitting"
                  onPress={() => onSubmit()}
                >
                  Generate gift ideas
                </PrimaryButton>
        </ScrollView>
      </KeyboardAvoidingView>
      </Center>
  );
}