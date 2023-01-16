import { RootTabScreenProps } from '../types';
import React, { useState } from "react";
import { Center, Heading, Text, HStack, Spinner, ScrollView, KeyboardAvoidingView, useToast, Radio, Stack, VStack, Box, FormControl, Input, Slider, Flex } from 'native-base';
import { Platform } from "react-native";
import { PrimaryButton } from '../components/UI/Button';
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
      <Flex flex={1} justifyContent="center" alignItems="center">
        <Center px="5" py="5" >
          <VStack space={30} justifyContent="center" alignItems="center">
            <Spinner size="lg" />
          </VStack>
          <Text fontSize='lg'>Looking for the best gift ideas</Text>
        </Center>
      </Flex>
    );
  }

  if (result) {
    return (

      <Center px={5} py={2} flex={1}>
        <ScrollView py={20}>
          <Heading>Here are some great gift ideas</Heading>
          <Text fontSize='sm'>{result}</Text>
        </ScrollView>
        <PrimaryButton mb={10}
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <Stack space={1} alignSelf="center" px="10" safeArea mt="2" w={{
          base: "100%",
          md: "5%"
        }}>
          <Heading>Generate gift ideas 🎁 💡</Heading>

          <Box>
            <FormControl mb="5">
              <FormControl.Label>Select Gender</FormControl.Label>
              <Radio.Group name="gender" accessibilityLabel="Gender" value={gender} onChange={nextValue => {
                setGender(nextValue);
              }}>
                <HStack space={10} px="10">
                  <Radio value="man" my={1}>
                    Man
                  </Radio>
                  <Radio value="two" my={1}>
                    Woman
                  </Radio>
                </HStack>
              </Radio.Group>
            </FormControl>
          </Box>
          <Box>
            <FormControl mb="2">
              <FormControl.Label>Age</FormControl.Label>
              <Input
                keyboardType="numeric"
                value={age.toString()}
                onChangeText={(s) => setAge(Number.parseInt(s) || 0)}
              />

            </FormControl>
          </Box>
          <Box>
            <FormControl mb="2">
              <FormControl.Label>Min Price ${priceMin}</FormControl.Label>
              <Slider defaultValue={40} value={priceMin}
                onChange={(s) => setPriceMin(Math.floor(s))}
                size="lg">
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </FormControl>
          </Box>
          <Box>
            <FormControl mb="2">
              <FormControl.Label>Max Price ${priceMax}</FormControl.Label>
              <Slider defaultValue={40} value={priceMax}
                maxValue={500}
                onChange={(s) => setPriceMax(Math.floor(s))}
                size="lg">
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </FormControl>
          </Box>
          <Box mb={5}>
            <FormControl mb="2">
              <FormControl.Label>Hobbies</FormControl.Label>
              <Input
                placeholder="Hobbies"
                value={hobbies}
                onChangeText={setHobbies}
              />
              <FormControl.HelperText>
                Seperate hobbies with a comma
              </FormControl.HelperText>
            </FormControl>
          </Box>
          <PrimaryButton
            isLoading={loading}
            isLoadingText="Submitting"
            onPress={() => onSubmit()}
          >
            Generate gift ideas
          </PrimaryButton>
        </Stack>


      </ScrollView>
    </KeyboardAvoidingView>
  );
}