import React, { Component } from 'react';
import { View, Text,StyleSheet,TextInput,AsyncStorage } from 'react-native';
import { Header,Button,Card } from 'react-native-elements';


export default class Coust extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cName:'Cash In Hand',
      cCity:'Gondal',
      cNumber:'0'
    };
  }
  static navigationOptions = {
    drawerLabel: 'Create Invoice ',
    header: null, 

  };
  sgout= async () => {
   
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login')    
 }

  onNext(){
    const dat=this.state
 
  
  this.props.navigation.navigate('AddItem',{data:dat}) 
  }

  render() {
      
    return (
      <View style={styles.container}>
     <Header leftComponent={{ icon: 'menu', color: '#fff',onPress:()=>{this.props.navigation.openDrawer();} }}
  centerComponent={{ text: 'Customer Add', style: { color: '#fff' } }}
  rightComponent={{ icon: 'keyboard-return', color: '#fff' ,onPress:()=>{this.sgout()}}}/>
  <Card containerStyle={{marginTop:50}}>
        <TextInput style={styles.TextInput}  placeholder="Customer Name " underlineColorAndroid="black"
      onChangeText ={cName=>this.setState({cName})}
    />  
    <TextInput style={styles.TextInput}  placeholder="Customer City" underlineColorAndroid="black"
      onChangeText ={cCity=>this.setState({cCity})}
    />  
    <TextInput style={styles.TextInput}  placeholder="Customer number " underlineColorAndroid="black"
      onChangeText ={cNumber=>this.setState({cNumber})}
      keyboardType="numeric"
    />  
    <Button title="Next" rightIcon={{name: 'send'}} backgroundColor='#3D6DCC' buttonStyle ={{height:50,width:300,borderRadius:30,alignSelf:'center',marginTop:20}} onPress={this.onNext.bind(this)} />
    </Card>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 30,
    // justifyContent: 'center',
  },
  TextInput:{
    fontSize:20,
    height:45,
    width:300,
    padding: 8,
    paddingTop:5,
    alignSelf: 'center',
  },
});
