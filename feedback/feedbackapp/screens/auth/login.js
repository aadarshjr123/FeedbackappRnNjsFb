import React, { useContext, useState } from 'react'
import { View,TextInput, Text, Button,TouchableOpacity,Image } from 'react-native';
import async_storage from '@react-native-async-storage/async-storage';
import {MainContext} from '../../App';
import Reinput from 'reinput';

function loginScreen({ navigation })  {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const setAuthstate = useContext(MainContext);

  
    
    function onSubmit() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // console.log(email);
      // console.log(password);
      var raw = JSON.stringify({"email":email,"password":password});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("url", requestOptions)
        .then(response => response.text())
        .then(async (value) => {
          try {
            await async_storage.setItem('token', value);
            setAuthstate(true);
            // console.log(value);
          } catch (e) {
            console.error(e);
          }
        })
        .catch(error => console.log('error', error));
    }
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
       
        <View style={{width: 300}}>
        <Image style={{height: 100, width: 200, left: 50}}  source = {require('../../assets/images/1.png')}/> 
        </View>
        
        <View style={{marginTop: 30,alignItems: 'center', justifyContent: 'center' }}/>
       
        
        <View style={{marginTop: 30,alignItems: 'center', justifyContent: 'center' }}/> 
        <View style={{marginTop: 30,alignItems: 'center', justifyContent: 'center' }}/> 

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
              maxLength={25}
        />
        <Reinput
              style={{width: 350}}
              label="Password"
              keyboardType="default"
              color="#000"
              secureTextEntry={true}
              fontSize={15}
              fontFamily="Quicksand-Regular"
              activeColor="#55ADEE"
              onChangeText={setPassword}
              maxLength={25}
        />
  
          <TouchableOpacity onPress={onSubmit} style={{backgroundColor: '#55ADEE',width: 250, height: 60,borderWidth: 4, borderColor: '#55ADEE50',top: 20,borderRadius: 10}}>
          <Text style={{fontSize: 20 ,top:15,left: 100,color:'white',fontStyle: 'italic', fontWeight: 'bold'}}>Login</Text>
          </TouchableOpacity>
        
      <View style={{marginTop: 130,alignItems: 'center', justifyContent: 'center' }}/>
      <TouchableOpacity  style={{width: 250, height: 60,top: 30}}>
          <Text style={{fontSize: 20 ,top:10,left: 80,color:'#55ADEE'}} onPress={() => navigation.navigate('Signup')}>Goto Signup</Text>
          </TouchableOpacity>

      </View>
    );
  }

export default loginScreen;
