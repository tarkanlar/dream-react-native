import { Formik } from 'formik';
import { PrimaryButton } from '../UI/Button';
import { PrimaryInput } from '../UI/Input';
import { ResetPasswordSchema } from '../../lib/helpers';
import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Center, Heading, VStack, FormControl, Text, WarningOutlineIcon, Icon, HStack } from 'native-base';
import { LinkButton } from '../UI/Button';

import { handlePasswordReset } from '../../components/Auth/AuthHelper';



export default function ResetPasswordForm({ navigation }) {

  return (
    <Formik
    initialValues={{
      email: 'tarkan@hey.com'
    }}
    validationSchema={ResetPasswordSchema}
    onSubmit={values =>
      handlePasswordReset(
        values.email,
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
          <Heading>Forget Password</Heading>
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
          
          <PrimaryButton
            isDisabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
            isLoadingText="Submitting"
            onPress={() => handleSubmit()}
            onSubmitEditing={() => handleSubmit()}
          >
            Reset Password
          </PrimaryButton>
          <HStack alignItems="center">
            <Text>
              Don't have an account yet?
            </Text>
            <LinkButton  onPress={() => navigation.navigate('ResetPassword')}>
         Sign Up
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