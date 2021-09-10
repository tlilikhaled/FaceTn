import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';

const Personnes = [
  {
    id: '1',
    userName: 'maha maha',
    userImg: require('../assets/users/user-3.jpg'),
   
  },
  {
    id: '2',
    userName: 'Achref Achref',
    userImg: require('../assets/users/user-1.jpg'),

  },
  {
    id: '3',
    userName: 'MAlek Mliki',
    userImg: require('../assets/users/user-4.jpg'),
    
  },
  {
    id: '4',
    userName: 'Eya Eya',
    userImg: require('../assets/users/user-6.jpg'),

  },
  {
    id: '5',
    userName: 'samar samar',
    userImg: require('../assets/users/user-7.jpg'),
 
  },
];

const Search = ({navigation}) => {
    return (
      <Container>    
        <FlatList 
          data={Personnes}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Profil')}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                  </UserInfoText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
 