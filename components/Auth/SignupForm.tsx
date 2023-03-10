import { Formik } from 'formik';
import { PrimaryButton } from '../UI/Button';
import { PrimaryInput } from '../UI/Input';
import { FormSchema } from '../../lib/helpers';
import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Center, Heading, VStack, FormControl, Text, WarningOutlineIcon, Icon, HStack } from 'native-base';
import { LinkButton } from '../UI/Button';
import { handleSignup } from '../../components/Auth/AuthHelper';



export default function Signup({ navigation }) {
  const [passShow, setPassShow] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={FormSchema}
      onSubmit={values =>
        handleSignup(
          values.email,
          values.password,
          navigation
        )
      }
    >
      {({
        errors,
        touched,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        isValid,
      }) => (
        <Center
          _dark={{ bg: 'dark.100' }}
          _light={{ bg: 'blueGray.50' }}
          px={4}
          flex={1}
        >
          <VStack space={5} alignItems="center" w="100%">
            <Heading>Sign Up</Heading>
            <FormControl
              isInvalid={'email' in errors && touched.email}
              maxW="100%"
            >
              <PrimaryInput
                type="text"
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                InputLeftElement={
                  <Icon
                    as={<FontAwesome5 name="user" />}
                    size={5}
                    ml="5"
                    _dark={{
                      color: 'gray.500',
                    }}
                    _light={{ color: 'gray.900' }}
                  />
                }
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={'password' in errors && touched.password}
              maxW="100%"
            >
              <PrimaryInput
                type={passShow ? 'text' : 'password'}
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={errors.password}
                touched={touched.password}
                InputLeftElement={
                  <Icon
                    as={<FontAwesome5 name="lock" />}
                    size={5}
                    ml="5"
                    _dark={{
                      color: 'gray.500',
                    }}
                    _light={{ color: 'gray.900' }}
                  />
                }
                InputRightElement={
                  <Icon
                    as={
                      <FontAwesome5 name={passShow ? 'eye' : 'eye-slash'} />
                    }
                    size={5}
                    mr="5"
                    minWidth="6"
                    _dark={{
                      color: 'gray.500',
                    }}
                    _light={{ color: 'gray.900' }}
                    onPress={() => setPassShow(!passShow)}
                  />
                }
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>
            <PrimaryButton
              isDisabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
              isLoadingText="Submitting"
              onPress={() => handleSubmit()}
              onSubmitEditing={() => handleSubmit()}
            >
              Sign Up
            </PrimaryButton>
            <HStack alignItems="center">
              <Text>
                Already have an account?
              </Text>
              <LinkButton onPress={() => navigation.navigate('Login')}>
                Login
              </LinkButton>
            </HStack>

            <Text>
              Password must have a small letter, a capital letter, a
              number, must have a special character and min. 8 characters
              long
            </Text>

          </VStack>
        </Center>
      )}
    </Formik>
  );
};