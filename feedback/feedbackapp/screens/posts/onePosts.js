import React, { useState } from 'react'
import { View, Text, Button ,TextInput,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reinput from 'reinput';
import Icon from 'react-native-vector-icons/Ionicons';


const createPostScreen = ({navigation}) => {
  
  const [message,setMessage] = useState();

  async function createpost() {

    try {
    
    let value = await AsyncStorage.getItem('token')
    value = JSON.parse(value);
    if(value !== null) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+value.token);
      console.log("Bearer "+value);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({"message": message});

     var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log(value,message);
    fetch("url", requestOptions)
      .then(response => response.text())
      .then(result => console.log("hello",result))
      .catch(error => console.log('error', error));
    } 
   } catch (e) {
      console.error(e);
    }

    
  }  
  return (
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: '#fff'}}>
        <Text style={{bottom: 100,fontSize: 25,fontStyle: 'italic', fontWeight: 'bold'}}>Create your post</Text>
     
        <Reinput
              style={{width: 350}}
              label="Enter your message"
              keyboardType="default"
              // value={phone}
              color="#000"
              fontSize={15}
              fontFamily="Quicksand-Regular"
              activeColor="#55ADEE"
              onChangeText={setMessage}
              maxLength={1000}
        />

        <TouchableOpacity onPress={createpost}style={{
          flex: 0.3,
          width: 120, 
          maxHeight: 40, 
          top: 40, 
          borderWidth: 3 ,
          borderColor: '#55ADEE50', 
          borderRadius: 7, 
          backgroundColor: '#55ADEE'}}>
          <Text style={{top: 5,fontSize: 20, color: '#fff', left: 30,fontStyle: 'italic', fontWeight: 'bold'}}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{bottom: 450, right: 160}} onPress={() => navigation.navigate('Posts')}>
          <Icon name="arrow-back-circle" size={40}/>
        </TouchableOpacity>

        
      </View>
    );
  }

export default createPostScreen;
