import React from 'react';
import { FlatList,TouchableOpacity,ActivityIndicator, Text, View,StyleSheet,RefreshControl,Dimensions,NetInfo,AsyncStorage } from "react-native";
import { Toolbar } from 'react-native-material-ui';
//import Icon from 'native-base';  
import{List ,Overlay,ListItem} from "react-native-elements";

import {Constants} from 'expo';
import OfflineNotice from './OfflineNotice';
 export default class Contacts extends React.Component {
  
  static navigationOptions = {
    drawerLabel: 'View Invoice  ',
    header: null, 

  };

constructor(props) {
  super(props);
  this.arrayholder = [];
}
 state = {
   data: [], 
   search:"RollId",
   isLoding:true, 
   isConnected: true,
   refreshing:false,
   
 };
 sgout= async () => {

  await AsyncStorage.clear();
  this.props.navigation.navigate('Login')    
}
 searchFilterFunction = text => {
  // console.log(this.arrayholder);
  const newData = this.arrayholder.filter(item => {
    const itemData = `${item.bill_no.toUpperCase()} ${item.cName.toUpperCase()}`;
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  this.setState({
    data: newData,
  });
};
componentDidMount() {
  NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  NetInfo.isConnected.fetch().then(isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
      
    } else {
      this.setState({ isConnected });
     
    }
  
  
  });
}
componentWillMount()
{
  this.fetchData();
  // NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
}
  _onRefresh(){
    if (this.state.isConnected){
    this.setState({refreshing: true});
    this.fetchData().then(()=>{
      this.setState({refreshing: false});
    })
  }else{
    this.setState({refreshing: false});
   }
  }



  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
      this.fetchData();     
    } else {
      this.setState({ isConnected });
    }
  };

  render() {
    
   
    const {navigate}= this.props.navigation;
        if (this.state.isLoading) {
      return (
        <View style={styles.container}>
        <View style={{height:Constants.statusBarHeight,backgroundColor:'#1769aa'}}/>
        <Toolbar
      // style={{backgroundcolor:'white'}} 
     
        centerElement="Invoice Details"
        searchable={{
          autoFocus: true,
          placeholder: 'Search...',
          onChangeText:searchTerm => this.setState({ searchTerm }) 
        }}
             

      />

        <View style={{flex: 1,alignItems:'center',justifyContent:'center', paddingTop: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
          <Text>Fetching Data Please Wait....</Text>
        </View>
        </View>
      );
    }
 
    
 
    return (
      
<View style={styles.container}>
<View style={{height:Constants.statusBarHeight,backgroundColor:'#1769aa'}}/>
<Toolbar
  
        centerElement="Invoice Details"

        searchable={{
          autoFocus: true,
          placeholder: 'Search...',
          onChangeText:text => this.searchFilterFunction(text)
        }}
             
        
      />

<Text>{this.state.isConnected}</Text>
<OfflineNotice />

<List style={{backgroundcolor:'white'}}>


<FlatList
style={{marginBottom:100}}
data={this.state.data}
keyExtractor={(x,i)=> i}
renderItem={({item}) =>

<ListItem 
onPress={()=>{this.props.navigation.navigate('ViewInvoice',{data:item});console.log(item)}} 

title={`BillNo:${item.bill_no}  Name:${item.cName} `}
subtitle={`Amount: ${item.amount}  Date:${item.date}`}
leftAvatar={{ rounded: true }}
leftIcon={{ name:'account-circle',size:60 }}
subtitleStyle={[item.pending>0?{color:'red'}:{}]}
chevronColor="white"
chevron
    
/>

}
refreshControl={
  <RefreshControl
  refreshing={this.state.refreshing}
  onRefresh={this._onRefresh.bind(this)}/>
}
/>
</List>





</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,    
      // paddingTop:Constants.statusBarHeight,
      backgroundColor:'white',  
  },
  
});
