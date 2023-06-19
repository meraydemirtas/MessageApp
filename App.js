import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ChatList from './screens/ChatList';
import Chat from './screens/Chat';
import Setting from './screens/Setting';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";



//ChatList kısmının refresh süresi nasıl ayarlanır 



const firebaseConfig = {
  apiKey: "AIzaSyBOHF703X1jR_DPJkSlwyFwZcvulx2zVrk",
  authDomain: "messageapp-5978e.firebaseapp.com",
  projectId: "messageapp-5978e",
  storageBucket: "messageapp-5978e.appspot.com",
  messagingSenderId: "207986084796",
  appId: "1:207986084796:web:0247c6449567c568e579b9",
  measurementId: "G-XK564KSJ03"
};
firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        navigation.navigate("SignUp")
        
      }


    })
    const isLoggedin = false;
    if(!isLoggedin){
        navigation.navigate("SignUp");
    
    }
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={route.name === 'ChatList' ? 'chatbubbles' : 'settings'}
              color={color}
              size={size}
            />
          );
        },
      })}
    >
      <Tab.Screen name="ChatList" component={ChatList} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator>
          <Stack.Screen
            name="Message App"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="SignUp" component={SignUp} options={{presentation:'fullScreenModal'}} />
          <Stack.Screen name="SignIn" component={SignIn}  options={{presentation:'fullScreenModal'}}/>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
