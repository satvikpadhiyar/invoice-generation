import React from 'react';
import {  StyleSheet, Text, View ,TextInput,TouchableOpacity,Keyboard,KeyboardAvoidingView,NetInfo,AsyncStorage} from 'react-native';
import Logo from './components/Logo';
import { Button } from 'react-native-elements';


export default class HomeScreen extends React.Component {
 constructor(props) {

      super(props)

      this.state = {

        UserEmail: '',
        UserPassword: '',
        isConnected: true,
        isLoading:false

      }
     
      this._bootstrapAsync();
    }
    _bootstrapAsync = async () => {
      const userToken = 
      await AsyncStorage.getItem('user');
  
      this.props.navigation.navigate(userToken ? 'AppStack' : 'Auth');
      
      
     
    };
    componentDidMount() {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          this.setState({ isConnected });
          
        } else {
          this.setState({ isConnected });
          alert("No Internet");
        }
      
      
      });
      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }
    componentWillUnmount() {
      NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
  
    
  
  
  
  
    handleConnectivityChange = isConnected => {
      if (isConnected) {
        this.setState({ isConnected });
        
      } else {
        this.setState({ isConnected });
        alert("No Internet");
      }
    };
    login =()=>{
      if(this.state.isConnected) {
        this.setState({isLoading:true})
      const {UserEmail}=this.state;
      const {UserPassword}=this.state;
      Keyboard.dismiss();
        if(UserEmail!='' && UserPassword!='' ){
        fetch('',
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
           this.setState({isLoading:false});
           if(responseJson === 'ok')
        {
          AsyncStorage.setItem('user',UserEmail);
            //Then open Profile activity and send user email to profile activity.
          this.props.navigation.navigate('Coust');

        }
        else{
          alert("Username or Password do not match");
          //alert(responseJson);
        }

      }).catch((error) => {
        console.error(error);
      });

    }else {
        alert("Username or Password can not be empty ");
        this.setState({isLoading:false});
    }
  }else{alert("No Internet");}

    }


  static navigationOptions={
    header: null
  }

  render() {
    return (

      <View style={styles.maincontainer}>

<KeyboardAvoidingView style={styles.maincontainer} behavior="position" enabled>
<Logo/>
 <View style={styles.container}>
<View>
        <TextInput style={{borderRadius:25, width:300,
        backgroundColor:'rgba(255,255,255,0.3)',
         paddingHorizontal:16,
         marginLeft:15,
        fontSize:16,
        height:50,
        color:'#ffffff',
        marginVertical:10}}
        autoCapitalize="none"
        underlineColorAndroid= 'rgba(0,0,0,0)'
         placeholder="UserName"
        placeholderTextColor="#ffffff"
        onChangeText={UserEmail => this.setState({UserEmail})}
         />
             <TextInput style={{borderRadius:25, width:300,
        backgroundColor:'rgba(255,255,255,0.3)',
        paddingHorizontal:16,
        fontSize:16,
        marginLeft:15,
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
         
         <Button title="Login" buttonStyle ={styles.button} titleStyle={styles.buttonText} onPress={this.login.bind(this)} loading={this.state.isLoading}/>
         {/* <TouchableOpacity style={styles.button} onPress={this.login}>

              <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity> */}
</View>
 </View>
</KeyboardAvoidingView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#455a64',
    alignItems: 'center',
    justifyContent: 'center',
  },
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

