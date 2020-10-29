import React, { useContext, useState } from 'react'
import { View, Text,Image, TextInput, Button,TouchableOpacity} from 'react-native';
import { MainContext } from '../../App';
import async_storage from '@react-native-async-storage/async-storage';
import Reinput from 'reinput';
import Icon from 'react-native-vector-icons/Ionicons';


function signupScreen({navigation}) {
  const [username,setUsername] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [confirm,setConfirm] = useState();
  const setAuthstate = useContext(MainContext);

  function onSubmit() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({email,password,"confirmPassword":confirm,username});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log(raw);
    fetch("url", requestOptions)
      .then(response => response.text())
      .then(async (value) => {
        try {
          await async_storage.setItem('token', value);
          setAuthstate(true);
          console.log(value);
        } catch (e) {
          console.error(e);
        }
      })
      // .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: '#fff' }}>
      <View style={{width: 300}}>
        <Image style={{height: 100, width: 200, left: 50}}  source = {require('../../assets/images/1.png')}/> 
        </View>
      <View style={{marginTop: 30,alignItems: 'center', justifyContent: 'center' }}/>
    
      <Reinput
              style={{width: 350}}
              label="Username"
              keyboardType="default"
              // value={phone}
              color="#000"
              fontSize={15}
              fontFamily="Quicksand-Regular"
              activeColor="#55ADEE"
              onChangeText={setUsername}
        />
  
      <Reinput
              style={{width: 350}}
              label="Email"
              keyboardType="default"
              // value={phone}
              color="#000"
              fontSize={15}
              fontFamily="Quicksand-Regular"
              activeColor="#55ADEE"
              onChangeText={setEmail}
        />
      
      <Reinput
              style={{width: 350}}
              label="Password"
              keyboardType="default"
              // value={phone}
              color="#000"
              secureTextEntry={true}
              fontSize={15}
              fontFamily="Quicksand-Regular"
              activeColor="#55ADEE"
              onChangeText={setPassword}
        />
      
      <Reinput
              style={{width: 350}}
              label="Confirm password"
              keyboardType="default"
              // value={phone}
              color="#000"
              secureTextEntry={true}
              fontSize={15}
              fontFamily="Quicksand-Regular"
              activeColor="#55ADEE"
              onChangeText={setConfirm}
        />
      <View style={{marginTop: 30,alignItems: 'center', justifyContent: 'center' }}/> 
    
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} onPress={onSubmit} style={{backgroundColor: '#55ADEE',width: 250, height: 60,borderWidth: 4, borderColor: '#55ADEE50',top: 30,borderRadius: 10}}>
          <Text style={{fontSize: 20 ,top:15,left: 95,color:'white',fontStyle: 'italic', fontWeight: 'bold'}}>Signup</Text>
          </TouchableOpacity>

      <TouchableOpacity style={{bottom: 650, right: 160}} onPress={() => navigation.navigate('Login')}>
          <Icon name="arrow-back-circle" size={40}/>
        </TouchableOpacity>    
    </View>
  );
  }

export default signupScreen;
