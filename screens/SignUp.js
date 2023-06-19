import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput,Button,Subheading } from 'react-native-paper';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { useNavigation } from '@react-navigation/native';



const SignUp = () => {

    const[name,Setname] = useState('');
    const[password,Setpassword] = useState('');
    const[email,Setemail] = useState('');
    const[isLoading,setIsLoading]=useState(false);
    const[error,setError] = useState('');

    const navigation = useNavigation("");

    const createAccount = async () => {
        setIsLoading(true);
      
        try {
          const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
          if (response) {   
            response.user.updateProfile({displayName:name});
            navigation.popToTop();
          }
        } catch (error) {
          setError(error.message);
          console.log(error);
        }
      
        setIsLoading(false);
      };
return(
    <View>
 {!!error && (
        <Subheading
          style={{ color: "red", textAlign: "center", marginBottom: 16 }}
        >
          {error}
        </Subheading>
      )}
    
    
    <TextInput label="Name" value={name} onChangeText={(text) =>Setname(text)}></TextInput>
    <TextInput label="Mail" value={email} onChangeText={(text) => Setemail(text)} keyboardType='email-address'></TextInput>
    <TextInput label="Password" value={password} onChangeText={(text) =>Setpassword(text)} secureTextEntry></TextInput>

    
         <View style={{flexDirection: 'row',marginTop:5,justifyContent:'space-between'}}>
             <Button  mode='' onPress={()=>  navigation.navigate("SignIn")}>SIGN IN</Button>
             <Button mode='contained' onPress={()  => createAccount()}>SIGN UP</Button>
        </View>
    </View>
)

}
export default SignUp;