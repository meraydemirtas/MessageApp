import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, Avatar, Divider, Title, Subheading, Button, TextInput } from 'react-native-paper';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";


const Setting = () => {
    const [name, setName] = useState('');
    const [mail, setEmail] = useState('');

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setName(user?.displayName ?? '');
            setEmail(user?.email ?? '');
        })
    }, []);

    const getInitials = (name) => {
        const firstName = name.substring(0, name.lastIndexOf(" "));
        const lastName = name.substring(name.lastIndexOf(" ") + 1);
        return firstName.charAt(0) + lastName.charAt(0);
    }

    return (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Avatar.Text label={getInitials(name)} />
            <Title>{name}</Title>
            <Subheading>{mail}</Subheading>
            <Button onPress={() => firebase.auth().signOut()}>SIGN OUT</Button>
        </View>
    );
};

export default Setting;
