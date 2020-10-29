
import React,{createContext, useState,useEffect} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginScreen from './screens/auth/login';
import signupScreen from './screens/auth/signUp';
import postsScreen from './screens/posts/allPosts';
import createPostScreen from './screens/posts/onePosts';
import likes from './utils/Likes';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();
export const MainContext = createContext(null);


function Auth () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={loginScreen}/>
        <Stack.Screen options={{headerShown: false}} name="Signup" component={signupScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Home () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  options={{headerShown: false}} name="Posts" component={postsScreen}/>
        <Stack.Screen options={{headerShown: false}} name="Create" component={createPostScreen}/>
     </Stack.Navigator>
    </NavigationContainer>
  )
}

function App() {
  const [authstate,setAuthstate] = useState(true);

  useEffect(() => {
    //token retrive
    (async () =>
      {try  {
      // const value = null; 
      // AsyncStorage.removeItem('token');
      let value = await AsyncStorage.getItem('token');
      if(value !== null)
      {
        // console.log(value);
        setAuthstate(true);
      }
      else {
        return console.log("false");
      }
    } catch (e) {
      console.error(e);
    }
  })
    return
  }, [authstate])
  console.log(authstate);
  return (
    <MainContext.Provider value={setAuthstate}>
      {authstate ? <Home/> : <Auth/>}
    </MainContext.Provider>
  )
}

export default App;