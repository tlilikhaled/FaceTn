import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-community/async-storage'
// formik
import { Formik } from 'formik';

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from '../components/styles';
import { View,Text, ActivityIndicator } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
//colors
const {light, lime,deeppink,darkLight, brand, primary } = Colors;

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// api client
import axios from 'axios';


const Login = ({ navigation })  => {
  const[email,setEmail] = useState();
  const[password,setPassword] = useState(); 
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const STORAGE_KEY = '@save_data';
 const instance= axios.create({
  baseURL:'http://192.168.1.15:3000',
 // timeout:1000,


  
}) 
  const handleLogin =async (credentials, setSubmitting)=> {
    handleMessage(null);

    instance
      .post('/user/signin', credentials)
      .then(async (response)  => {
        
        const result = response.data;
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
        // console.log(data);
        //asyncstorage Save
          try {
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem(
              STORAGE_KEY,
              jsonValue
            );
            navigation.navigate('MainTab',{data:data[0]});

           // navigation.navigate('MainTab',{profile:data[0]});
          }
           catch (error) {
            // Error saving data
            console.log('error to save data')
          }
          //console.log(data[0]);
        }
        setSubmitting(false);
      })
     .catch((error) => {
      
       setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
       console.log(error);
      }); 
  }; 

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/img/facetn.jpg')} />
          <PageTitle>Bienvenue Chez <Text style={{fontWeight: 'bold', fontSize: 25, color: Colors.deeppink}}>
            Face</Text> 
            <Text
            style={{fontWeight: 'bold', fontSize: 25, color: Colors.lime}}>
            Tn </Text> !
          
          </PageTitle>
          <SubTitle> 
          Connectez-vous pour continuer
          </SubTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (email == '' || password == '') {
                handleMessage('Please fill in all fields');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => ( 
              <StyledFormArea>
                <MyTextInput
                
                  placeholder="Email"
                  placeholderTextColor={darkLight}
                  
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  icon="mail"
                />
                <MyTextInput
                 
                  placeholder="Mot de passe"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  icon="lock"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && ( 
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Se Connecter</ButtonText>
                  </StyledButton>
                 )} 
               {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                 )}
 
              
                <ExtraView>
                  <ExtraText>Tu n'as pas un compte facetn? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>S'inscrire</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
             )}
          </Formik> 
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
//commit