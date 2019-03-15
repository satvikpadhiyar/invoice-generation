import React, { Component } from 'react';
import { View, Text,StyleSheet,NetInfo,AsyncStorage,ActivityIndicator} from 'react-native';
import{Header} from "react-native-elements";
import DateTimePicker from 'react-native-modal-datetime-picker';


export default class sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isDateTimePickerVisible: false,
        today:0,
        tmonth:0,
        tweek:0,
        isLoading:false,
        isConnected:true
        
    };
  }
  sgout= async () => {

    await AsyncStorage.clear();
    this.props.navigation.navigate('Login')    
  }
  fetchData = async ()=>{
    const userToken = 
    await AsyncStorage.getItem('user');
    this.setState({isLoading:true})
  if(userToken=='lokesh' || userToken=='satvik'){
    if(this.state.isConnected){   
      
         const response = await fetch('', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user:userToken  
         })
    }).catch(err => console.error('An error occurred', err));
   const json = await response.json();
   console.log(json)
   if(json=="logout"){
    this.sgout();
   }else{
   this.setState({ today: json.today,tmonth:json.month,tweek:json.week });}
       }else{
           alert('No Internet')
       }
       this.setState({isLoading:false})
    }else{
        alert('Something Went Wrong Please Try again later');
        this.props.navigation.navigate('Coust');
    }
  }
  shouldCall=()=>{
    this.fetchData(); 
  };
  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState({ isConnected });
        
      } else {
        this.setState({ isConnected });
       
      }
    
    
    });
    this.props.navigation.addListener(
        'willFocus',
          this.shouldCall
      );
  }
  componentWillMount(){
    this.fetchData();
    
  }
  



  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };
  render() {
    return (
      <View style={styles.container}>
      <Header leftComponent={{ icon: 'menu', color: '#fff',onPress:()=>{this.props.navigation.openDrawer();} }}
  centerComponent={{ text: 'Sales', style: { color: '#fff' } }}
  rightComponent={{ icon: 'refresh', color: '#fff',onPress:()=>{this.fetchData()}}}/>
      {this.state.isLoading?<View style={{flex: 1,alignItems:'center',justifyContent:'center', paddingTop: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
          <Text>Fetching Data Please Wait....</Text>
        </View>:<View>
        <Text style={styles.heading}> Today's Sale: </Text>
        <Text style={styles.subtitle}> {this.state.today} </Text>      
        <Text style={styles.heading}> This Week's Sale: </Text>
        <Text style={styles.subtitle}> {this.state.tweek} </Text>
        <Text style={styles.heading}> This Month's Sale: </Text>
        <Text style={styles.subtitle}> {this.state.tmonth} </Text> 
        </View>

            }
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />

      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor:'white'
  
      
    },
    heading:{
        fontSize:30,
        fontWeight: 'bold',
    },
    subtitle:{
        fontSize:30,
        padding: 10,
        alignSelf: 'center',

    }
})
