import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/compat';
import "firebase/compat/firestore";
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = () => {
  const route = useRoute();
  const [messages, setimsiMessage] = useState([]);
  const [uid,setUID] =useState('');
  const [name,setName] = useState('');
  useEffect(() =>{
    
return firebase.auth().onAuthStateChanged(user =>{
    setUID(user?.uid);
    setName(user?.displayName);
    user.uid; 
    user.displayName;
}) 
  },[])

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .doc('chats/' + route.params.chatId)
      .onSnapshot((snapshot) => {
        setimsiMessage(snapshot.data()?.messages ?? []);
      });
    return unsubscribe;
  }, [route.params.chatId]);

  const onSend = (m = []) => {
    firebase.firestore().doc('chats/' + route.params.chatId).set({
        messages:GiftedChat.append(messages,m)
    },{merge:true})

  }

  return  <GiftedChat
  messages={messages.map(x => (
    {...x,createdAt:x.createdAt?.toDate(),}))}
  onSend={messages => onSend(messages)}
  user={{
    _id: uid,
    name:name,
  }}
/>;
};

export default Chat;
