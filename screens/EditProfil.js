import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage'
import FormButton from '../components/FormButton';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';


const EditProfil = ({navigation, route }) => {
  //const name = route.params;
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const STORAGE_KEY = '@save_data';
useEffect(() => {
  const retrieveData = async () => {
    try {
      const valueString = await AsyncStorage.getItem(STORAGE_KEY);
      const value = JSON.parse(valueString);
      // Other set states
      setData(value);
    } catch (error) {
      console.log(error);
    }
  };
  // Retrieve if has new data
    retrieveData();
},[])
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      bs.current.snapTo(1);
    });
  };
  const updateprofil = ({credentials}) => {
   //credentials.persist();
    handleMessage(null);
    const url = 'http://192.168.1.121:3000/user/6123882409fed513585f2081';
   // console.log({id});
    axios
      .put(url, credentials)
      .then((response) => {
        
        const result = response.data;
        const { status, message, data } = result;
        console.log(data);
        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          navigation.navigate('Profil', { ...data });
          
        }
       
      })
      .catch((error) => {
       
        handleMessage('An error occurred');
       // console.log(error.toJSON());
      });
  };
  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };
  bs = React.createRef();
  fall = new Animated.Value(1);
  renderInner = () => ( 
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Télécharger Photo</Text>
        <Text style={styles.panelSubtitle}>Choisissez votre photo de profil</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Prendre Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choisir dans la bibliothèque</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
         onPress={() =>current.snapTo(1)} >
        <Text style={styles.panelButtonTitle}>Annuler</Text>
      </TouchableOpacity>
    </View>
   ); 

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

 

  return (
    <ScrollView>
    <View style={styles.container}>
     <BottomSheet
        ref={bs}
        snapPoints={[330, -5]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      /> 
      <Animated.View
        style={{
          margin: 20,
          //opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity  onPress={ () => bs.current.snapTo(0) } >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : userData
                    ? userData.userImg ||
                      'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                    : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            {data[0]?.name}
          </Text>
          
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder="Nom et Prénom"
            placeholderTextColor="#666666"
            //autoCorrect={false}
             //value={data[0]?.name}
             onChangeText={(txt) => setData({...data, name: txt})}
            style={styles.textInput}
          />
        </View>
        {/* <View style={styles.action}>
          <FontAwesome name="calendar" color="#333333" size={20} />
          <TextInput
            placeholder="Date de naissance"
            placeholderTextColor="#666666"
             value={data[0]?.dateOfBirth}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View> */}
        <View style={styles.action}>
          <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="À propos"
            placeholderTextColor="#666666"
            autoCorrect={true}
            value={data[0]?.aboutme}
            onChangeText={(txt) => setData({...data, aboutme: txt})}
            style={[styles.textInput, {height: 40}]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color="#333333" size={20} />
          <TextInput
            placeholder="Télephone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            value={data[0]?.phone.toString()}
            onChangeText={(txt) => setData({...data, phone: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            color="#333333"
            size={20}
          />
          <TextInput
            placeholder="Adresse"
            placeholderTextColor="#666666"
            autoCorrect={false}
             value={data? data[0]?.address : ''}
            onChangeText={(txt) => setData({...data, address: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#333333" size={20} />
          <TextInput
            placeholder="Nouveau mot de passe"
            placeholderTextColor="#666666"
            autoCorrect={false}
          /*   value={userData ? userData.country : ''}
            onChangeText={(txt) => setUserData({...userData, country: txt})} */
            style={styles.textInput}
          />
        </View>
      
         <FormButton buttonTitle="Confirmer" onPress= {updateprofil} /> 
      </Animated.View>
    </View>
    </ScrollView>
  );
};

export default EditProfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },
});
