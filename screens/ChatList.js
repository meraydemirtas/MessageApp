import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, Avatar, Divider, FAB, Portal, Dialog, Button, TextInput } from 'react-native-paper';
import firebase from 'firebase/compat';
import "firebase/compat/firestore";
import { useNavigation } from '@react-navigation/native';

const ChatList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setEmail(user?.email ?? '');
    });
  }, []);

  const navigation = useNavigation();

  const createChat = async () => {
    if (!email || !userEmail) return;
    const response = await firebase.firestore().collection('chats').add({
      users: [email, userEmail]
    });
    setIsDialogVisible(false);
    navigation.navigate('Chat', { chatId: response.id });
  }

  const [chats, setChats] = useState([]);

  useEffect(() => {
    return firebase.firestore().collection('chats').where('users', 'array-contains', email).onSnapshot((querySnapshot) => {
      setChats(querySnapshot.docs);
    })
  }, [email]);

  const getInitials = (name) => {
    const firstName = name.substring(0, name.lastIndexOf(" "));
    const lastName = name.substring(name.lastIndexOf(" ") + 1);
    return firstName.charAt(0) + lastName.charAt(0);
  }

  return (
    <View style={{ flex: 1 }}>
      {chats.map(chat => (
        <React.Fragment key={chat.id}>
          <List.Item
            key={chat.id}
            title={chat.data().users.find(x => x !== email)}
            description="Hi, I will"
            left={() => <Avatar.Text label={getInitials(chat.data().users.find(x => x !== email))} size={45} />}
            onPress={() => navigation.navigate("Chat", { chatId: chat.id })}
          />
          <Divider inset />
        </React.Fragment>
      ))}

      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title>New Chat</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Enter user email"
              value={userEmail}
              onChangeText={text => setUserEmail(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => createChat()}>Add</Button>
            <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB icon="plus" style={{ backgroundColor: "red", position: "absolute", bottom: 16, right: 16 }}
        onPress={() => {
          setIsDialogVisible(true);
        }}
      />
    </View>
  );
}

export default ChatList;
