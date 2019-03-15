import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,Text
} from 'react-native';
// import { SplashScreen } from 'expo';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
   
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = 
    await AsyncStorage.getItem('user');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // console.log(userToken)
    this.props.navigation.navigate(userToken ? 'AppStack' : 'Auth');
    
        // if(userToken==='student'){
        //       this.props.navigation.navigate('Student');
             

        //   }else if(userToken==='faculty'){
        //       this.props.navigation.navigate('Faculty');
             
         
        //     }else
        //     { 
        //       this.props.navigation.navigate('Auth');
              
        //     }
      
    
   
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
        <Text style={{paddingTop:5,fontSize:10}}>Authenticating.....</Text>
        <StatusBar barStyle="default"  />
      </View>
    );
  }
}