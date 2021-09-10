import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPosts';

import mime from "mime";
import { Formik } from 'formik';


const AddPost = ({ navigation })=> {
 
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };
  const createFormData = (image, body) => {
    const formData = new FormData();
  const newImageUri =  "file:///" + imageUri.split("file:/").join("");
 // console.log(image)
  formData.append('image', {
      uri : newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop()
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return formData;
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({ 
     // console.log('Response = ', response);
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
     // console.log("jfkj",image);
      setImage(image);
      fetch('http://192.168.1.15:3000/post/upload', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded', //Specifying the Content-Type
          }),
          body: createFormData(image, {id: '123'}),
        })
          .then((data) => data.json())
          .then((res) => {
            console.log('upload succes', res);
            
          })
          .catch((error) => {
            console.log('upload error', error);
            
          });
  
    });
      setImage(image);
  };

 /*  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);
  } */
  const handlePost = (credentials, setSubmitting)=> {
  
  // const imageUrl = await uploadImage();
   console.log('Image Url: ', {image,statut:credentials?.statut});
    handleMessage(null);
    const url = 'http://192.168.1.121:3000/post/addpost';
    axios
      .post(url, "data",headers)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
       console.log("response",response?.data);
        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          navigation.navigate('Home', { ...data });
          
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
     // console.log(error.toJSON());
      });
  };
  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <View style={styles.container}>
      
        <Formik
            initialValues={{ statut: '', image: '' }}
            onSubmit={(values, { setSubmitting }) => {
              //values = { ...values};
              if (
                values.statut == '' &&
                values.image == '' 
              ) {
                handleMessage('Please fill in all fields');
                setSubmitting(false);
              } else {
                handlePost(values, setSubmitting);
              }
            }}
          >
          {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>(
            <InputWrapper>
            {image != null ? <AddImage source={{uri: Platform.OS === 'ios' ? image.sourceURL : image.path}} /> : null}
             <InputField
            placeholder="Quoi de neuf ?"
            multiline
           numberOfLines={4}
           name="statut"
            value={values.statut}
            //onChangeText={(content) => setPost(content)}
            onChangeText={handleChange('statut')}
            onBlur={handleBlur('statut')}
          /> 
         
            {/* 
            <StatusWrapper>
              <Text>{transferred} % Completed!</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </StatusWrapper> */}
            
                
            {!isSubmitting && (
             <SubmitBtn onPress={handleSubmit}>
              <SubmitBtnText>Postuler</SubmitBtnText>
            </SubmitBtn> 
            )}
                
      </InputWrapper>
                 ) }       
                 </Formik> 
  <ActionButton buttonColor="#2e64e5" >
  <ActionButton.Item
    buttonColor="#9b59b6"
    title="Prendre Photo"
    onPress={takePhotoFromCamera}>
    <Icon name="camera-outline" style={styles.actionButtonIcon} />
  </ActionButton.Item>
  <ActionButton.Item
    buttonColor="#3498db"
    title="Choisir Photo"
    onPress={choosePhotoFromLibrary}>
    <Icon name="md-images-outline" style={styles.actionButtonIcon} />
  </ActionButton.Item>
</ActionButton>
 

    </View>
  );
};





export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
