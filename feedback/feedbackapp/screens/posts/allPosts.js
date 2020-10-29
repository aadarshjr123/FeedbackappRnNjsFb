import React,{useContext, useEffect, useState} from 'react'
import { View, Text,TouchableOpacity,Image,ScrollView} from 'react-native';
import async_storage from '@react-native-async-storage/async-storage';
import {MainContext} from '../../App';
import Likes from '../../utils/Likes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';




function postsScreen({navigation}) {

    // const data = [];
   const [data,setData] = useState([]);

   const setAuthstate = useContext(MainContext);
   
   async function signout() {
      
    //  await () => {
      try {
        await async_storage.removeItem('token');
        setAuthstate(false);
      } catch(e) {
        console.log(e);
      }
    
      console.log('Done.')
    // }
  }

  function likes(autoid) {
    var myHeaders = new Headers();
    var raw = "";

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("url"+autoid+"/likes", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  

   useEffect(() => {
      var raw = "";

      var requestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
      };

     fetch("url", requestOptions)
     .then(response => response.text())
    //  .then(data=> JSON.parse(data))
     .then(result => 
      {
        result = JSON.parse(result);
        
        let temp = Object.values(result);
        // console.log(temp);
        setData(temp)
      })
     .catch(error => console.log('error', error));
    },[]
   )


      return (
        // <ScrollView>
        <View style={{flex: 1,height: 840, backgroundColor: '#fff'}}>
        <View style={{
          flex: 0.1,
          maxHeight: 50, 
          top: 20, 
          width: 400,
          left: 5 , 
          borderWidth: 2, 
          borderColor:'white', 
          borderRadius: 7, 
          backgroundColor: '#fff',
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowRadius: 6,
          shadowOpacity: 0.6,
          elevation: 10}}>
        <Image style={{height: 50, width: 90, bottom: 7, left: 150}}  source = {require('../../assets/images/1.png')}/> 
        <TouchableOpacity
        style={{width: 50, height: 50, left: 345,bottom: 52}}
        onPress={signout}
        >
          <Icon name='logout' size={25} style={{left: 10, top: 10}}/>
        </TouchableOpacity>
        </View>  
        <View style={{height: 100, flex: 0.1}}>
        <Text style={{fontSize: 25,fontStyle: 'italic', fontWeight: 'bold', top: 55,left: 15}}>Posts</Text>
        <TouchableOpacity style={{left: 360, top: 25}} onPress={() => navigation.navigate('Create')}>
        <Icon1 name="ios-add-circle-sharp" size={30}/>
        </TouchableOpacity>
        </View>
          
          <View style={{flex: 0.8, maxHeight:650, bottom: 35}}>
          <ScrollView>  
         {data.map((val,i) => {return <View  key={i} style={{borderWidth: 2,margin: 15, borderColor: '#55ADEE',width: 390,height: 100, right: 5, top: 15,borderRadius: 7}}>
          <View style={{left: 20,width: 90,  backgroundColor: '#fff', bottom: 16}}>
          <Text style={{fontSize: 20,left: 10}}>{val.username}</Text>
          </View>
          <Text style={{fontSize: 25, left: 30, fontWeight: 'bold', top: 20}}>{val.message}</Text> 
          <Likes/>
         </View>})}
         </ScrollView>
         </View>        

      </View>
      );
  }

export default postsScreen;
