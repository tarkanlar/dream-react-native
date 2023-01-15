import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PrimaryButton, LinkButton } from '../UI/Button';
import { PrimaryInput } from '../UI/Input';
import { FontAwesome5 } from '@expo/vector-icons';
import { Center, Heading, VStack, FormControl, Text, WarningOutlineIcon, Icon } from 'native-base';


interface Props {
    handleToken: (email: string, token: string) => void;
    otpEmail: string;
}

export const OTPform: React.FC<Props> = ({ handleToken, otpEmail }) => {
    return (
        <Center
        _dark={{
          bg: 'dark.100',
        }}
        _light={{ bg: 'blueGray.50' }}
        px={4}
        flex={1}
      >
        <Formik
          initialValues={{
            token: '',
          }}
          validationSchema={Yup.object().shape({
            token: Yup.string().required('Token is required'),
          })}
          onSubmit={values => handleToken(otpEmail, values.token)}
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
              _dark={{
                bg: 'dark.100',
              }}
              _light={{ bg: 'blueGray.50' }}
              px={4}
              flex={1}
            >
              <VStack space={5} alignItems="center">
                <Heading>Enter Token</Heading>
                <FormControl
                  isInvalid={'token' in errors && touched.token}
                  maxW="100%"
                >
                  <PrimaryInput
                    type="text"
                    placeholder="Token"
                    onChangeText={handleChange('token')}
                    onBlur={handleBlur('token')}
                    value={values.token}
                    error={errors.token}
                    touched={touched.token}
                    InputLeftElement={
                      <Icon
                        as={<FontAwesome5 name="keyboard" />}
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
                    {errors.token}
                  </FormControl.ErrorMessage>
                </FormControl>
                <PrimaryButton
                  isDisabled={isSubmitting || !isValid}
                  isLoading={isSubmitting}
                  isLoadingText="Submitting"
                  onPress={() => handleSubmit()}
                  onSubmitEditing={() => handleSubmit()}
                >
                  Submit
                </PrimaryButton>
                <Text>
                  Check your email for the token. It will expire in 1 hour.
                </Text>
                <LinkButton>
                  Go back to Sign Up
                </LinkButton>
              </VStack>
            </Center>
          )}
        </Formik>
      </Center>
    );
};
