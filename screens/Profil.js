import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Alert,
  
} from 'react-native';

import FormButton from '../components/FormButton';
import {Container} from '../styles/FeedStyles';

import PostCard from '../components/PostCard';
import AsyncStorage from '@react-native-community/async-storage'

const Posts = [
  {
    id: '1',
    userName: 'Tlili Khaled',
    userImg: require('./../assets/users/user-2.jpg'),
    postTime: '4 mins ago',
    post:
    "Bonjour, c'est mon test pour un post de mon application facetn dans React Native.",
    postImg: require('../assets/posts/post-img-3.jpg'),
    liked: true,
    likes: '14',
    comments: '5',
  },
  {
    id: '2',
    userName: 'Tlili Khaled',
    userImg: require('../assets/users/user-2.jpg'),
    postTime: '2 hours ago',
    post:
    "Bonjour, c'est mon test pour un post de mon application facetn dans React Native.",
    postImg: 'none',
    liked: false,
    likes: '8',
    comments: '0',
  },
  {
    id: '3',
    userName: 'Tlili Khaled',
    userImg: require('../assets/users/user-2.jpg'),
    postTime: '1 hours ago',
    post:
    "Bonjour, c'est mon test pour un post de mon application facetn dans React Native.",
    postImg: require('../assets/posts/post-img-2.jpg'),
    liked: true,
    likes: '1',
    comments: '0',
  },
  {
    id: '4',
    userName: 'Tlili Khaled',
    userImg: require('../assets/users/user-2.jpg'),
    postTime: '1 day ago',
    post:
    "Bonjour, c'est mon test pour un post de mon application facetn dans React Native.",
    postImg: require('../assets/posts/post-img-4.jpg'),
    liked: true,
    likes: '22',
    comments: '4',
  },
  {
    id: '5',
    userName: 'Tlili Khaled',
    userImg: require('../assets/users/user-2.jpg'),
    postTime: '2 days ago',
    post:
    "Bonjour, c'est mon test pour un post de mon application facetn dans React Native.",
    postImg: 'none',
    liked: false,
    likes: '0',
    comments: '0',
  },
];
function Profil({navigation, route}){
  
 const STORAGE_KEY = '@save_data';
  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };
  const ListHeader = () => {
    return null;
  };
  const [data, setData] = useState([]);

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={require('./../assets/users/profil.jpg')} 
        />
        <Text style={styles.userName}>{data[0]?.name} </Text>
        <Text style={styles.aboutUser}>
        Developer
        </Text>
        <View style={styles.userBtnWrapper}>
        
        <>
        
          <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
            <Text style={styles.userBtnTxt}>Suivre</Text>
          </TouchableOpacity>
        </>
     
        <>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => {
              navigation.navigate('EditProfil');
            }}>
            <Text style={styles.userBtnTxt}>Editer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.userBtnTxt}>Deconnexion</Text>
          </TouchableOpacity>
        </>
      
    </View> 

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{Posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>

        <Container>
          <FlatList
            data={Posts}
            renderItem={({item}) => (
              <PostCard
                item={item}
                onDelete={handleDelete}
              />
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});





/* import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const Profil = ({navigation,route}) => {
  const {name} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={require('./../assets/img/facetn.jpg')} 
        />
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.aboutUser}>
       
        </Text>
       <View style={styles.userBtnWrapper}>
        
            <>
            
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Suivre</Text>
              </TouchableOpacity>
            </>
         
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('EditProfil');
                }}>
                <Text style={styles.userBtnTxt}>Editer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.userBtnTxt}>Deconnexion</Text>
              </TouchableOpacity>
            </>
          
        </View> 

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    top:10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
 */