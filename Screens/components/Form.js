import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Keyboard} from 'react-native';
import {navigation} from 'react-navigation';

export default class Login extends React.Component {
  constructor(props) {

      super(props)

      this.state = {

        UserEmail: '',
        UserPassword: ''

      }

    }
    login =()=>{

      const {UserEmail}=this.state;
      const {UserPassword}=this.state;
      Keyboard.dismiss;
        if(UserEmail!='' && UserPassword!='' ){
        fetch('https://depstar2.000webhostapp.com/user_login.php',
        {
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({

            email: UserEmail,

            password: UserPassword

          })

        }).then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched
       if(responseJson === 'ok')
        {

            //Then open Profile activity and send user email to profile activity.
          navigation.navigate('Second', { Email: UserEmail });

        }
        else{
          alert("Username or Password do not match");
          //alert(responseJson);
        }

      }).catch((error) => {
        console.error(error);
      });

    }else {
        alert("Username or Password can not be empty ")
    }

    
    }
  render() {

    return (


      <View style={styles.container}>

<View>
        <TextInput style={{borderRadius:25, width:300,
        backgroundColor:'rgba(255,255,255,0.3)',
         paddingHorizontal:16,
        fontSize:16,
        height:50,
        color:'#ffffff',
        marginVertical:10}}
        underlineColorAndroid= 'rgba(0,0,0,0)'
         placeholder="Roll no"
        placeholderTextColor="#ffffff"
        onChangeText={UserEmail => this.setState({UserEmail})}
         />
             <TextInput style={{borderRadius:25, width:300,
        backgroundColor:'rgba(255,255,255,0.3)',
         paddingHorizontal:16,
        fontSize:16,
        height:50,
        color:'#ffffff',
        marginVertical:10
}}
        underlineColorAndroid= 'rgba(0,0,0,0)'
         placeholder="Password"
         secureTextEntry={true}
        placeholderTextColor="#ffffff"
onChangeText={UserPassword => this.setState({UserPassword})}
         />
         <TouchableOpacity style={styles.button} onPress={this.login}>

              <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>
</View>

         </View>



    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems: 'center',

    marginVertical:200

    },
    keyboard:
    {
      flexGrow:1
    },
    // inputBox: {
    //     width:300,
    //     backgroundColor:'rgba(255,255,255,0.3)',
    //      paddingHorizontal:16,
    //     fontSize:16,
    //     color:'#ffffff',
    //     marginVertical:10
    // },
   buttonText: {
       fontSize:16,textAlign:'center',
    fontWeight:'500',
    color:'#ffffff',

    marginVertical:7
    },
 button:{
    width:300,
    backgroundColor:'#1c313a',
    borderRadius:25,
    marginVertical:15,
    height:40

 }


  });
