import React, { useState} from 'react';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Ionicons from 'react-native-vector-icons/Ionicons';
import PostCard from '../components/PostCard';
import {Container} from '../styles/FeedStyles';

const Posts = [
  {
    id: '1',
    userName: 'maha maha',
    userImg: require('./../assets/users/user-3.jpg'),
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
    userName: 'Tili Khaled',
    userImg: require('../assets/users/user-1.jpg'),
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
    userName: 'MAlek Mliki',
    userImg: require('../assets/users/user-4.jpg'),
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
    userName: 'Eya Eya',
    userImg: require('../assets/users/user-6.jpg'),
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
    userName: 'samar samar',
    userImg: require('../assets/users/user-7.jpg'),
    postTime: '2 days ago',
    post:
    "Bonjour, c'est mon test pour un post de mon application facetn dans React Native.",
    postImg: 'none',
    liked: false,
    likes: '0',
    comments: '0',
  },
];

const Home = () => {
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

  const deletePost = (postId) => {
    console.log('Current Post Id: ', postId);
  };
  const ListHeader = () => {
    return null;
  };
  return (
    
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
  );
};

export default Home;
