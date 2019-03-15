import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView,NetInfo,AsyncStorage } from 'react-native';
import { Button,Header,CheckBox } from 'react-native-elements'
import { Snackbar,RadioButton } from 'react-native-paper';
import { WebBrowser } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

export default class AddItem extends Component {
  
 constructor(){
   super()
   this.state={

    ItemName:[],
    tItemName:'',
    Quantity:[],
    tQuantity:'',
    price:[],
    tprice:'',
     Sub:[],
     tDNO:'',
     DNO:[],
     branch:[],
     tchecked:false,
     loading:false,
     visible:false
  
   }
   global.price=[];
   global.ItemName=[];
   global.Quantity=[];
   global.Sub=[];
   global.Total=0;
   global.tQuantity=0;  
   global.batchView=[];
   global.DNO=[];
   global.i=0;
   global.billno=0;
  }
  static navigationOptions = {
    drawerLabel:()=>null,
    header: null, 

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
  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
     
    } else {
      this.setState({ isConnected });
    }
  };
  sgout= async () => {


    await AsyncStorage.clear();
    this.props.navigation.navigate('Login')    
 }
  
  
  render() {

    
    return (
      <View style={styles.container}>
      <Header leftComponent={{ icon: 'menu', color: '#fff',onPress:()=>{this.props.navigation.openDrawer();} }}
  centerComponent={{ text: 'Mahalaxmi', style: { color: '#fff' } }}
  rightComponent={{ icon: 'clear', color: '#fff',onPress:()=>{this.props.navigation.dispatch(resetAction);} }}/>
      <View style={{flex:1}}>
    <View style={{justifyContent:'space-around',paddingBottom:20,flex:1}}> 
    <TextInput style={styles.TextInput}  placeholder="Item Name " underlineColorAndroid="black"
      onChangeText ={tItemName=>this.setState({tItemName})}
      value={this.state.tItemName}

    />  
    <View style={{flexDirection:'row',marginHorizontal:30}}>
    <TextInput style={[styles.TextInput,{width:150,paddingLeft:5}]} placeholder="Quantity " underlineColorAndroid="black"
    keyboardType="numeric"
       onChangeText ={tQuantity=>this.setState({tQuantity})}
       value={this.state.tQuantity}
    />  
    <TextInput style={[styles.TextInput,{width:150}]}  placeholder="price " underlineColorAndroid="black"
       onChangeText ={tprice=>this.setState({tprice})}
      value={this.state.tprice}
       keyboardType="numeric"
    />
    
   
    </View>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text>Mahalaxmi</Text>
     <RadioButton
          value="M"
          status={this.state.tchecked === 'M' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ tchecked: 'M' }) }}
        />
      <Text>Chandni</Text>  
        <RadioButton
          value="C"
          status={this.state.tchecked=== 'C' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ tchecked: 'C' }) }}
        /></View>
    <TextInput style={styles.TextInput}  placeholder="DNO " underlineColorAndroid="black"
        onChangeText ={tDNO=>this.setState({tDNO})}
        value={this.state.tDNO}
       keyboardType="numeric"
    />
  
     
  </View>
  <Button title="Add"  buttonStyle ={{height:50,width:300,borderRadius:30,alignSelf:'center',marginTop:20}} backgroundColor='green' onPress={this.onAdd.bind(this)}/> 
    </View>
    <View style={{flex:1,paddingTop:10}}>
      <View style={{height:35,backgroundColor:'#d3d3d3',flexDirection:'row',justifyContent:'space-between' }} >
        <Text style={styles.Text}>Item Name</Text>
        <Text style={styles.Text}>DNO</Text>
        <Text style={styles.Text}>Batch</Text>
        <Text style={styles.Text}>Quantity</Text>
        <Text style={styles.Text}>Price</Text>
        <Text style={styles.Text}>Sub Total</Text>

      </View>
        <ScrollView>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={styles.data}>
        {global.ItemName}
        </View>
        <View style={styles.data}>
        {global.DNO}
        </View>
        <View style={styles.data}>
        {global.batchView}
        </View>
        <View style={styles.data}>
        {global.Quantity}
        </View>
        <View style={styles.data}>
         {global.price}
               </View>
        <View style={styles.data}>
          {global.Sub}
        </View>
        </View>
        </ScrollView>
    </View>
    
    <View style={{backgroundColor:'#d3d3d3',flex:0.1,justifyContent:'flex-end',flexDirection:"row",marginHorizontal:10,marginBottom:10}}> 
    
     <Text style={styles.Total}>Quantity:</Text>
     <Text style={styles.Total}>{tQuantity}</Text>
     <Text style={styles.Total}>Total:</Text>
      <Text style={styles.Total}>{Total}</Text>
    </View>
    <Button title="Checkout" buttonStyle ={{height:50,width:300,borderRadius:30,alignSelf:'center',marginBottom:10}} onPress={this.onNext.bind(this)}
    loading={this.state.loading}
     disabled={this.state.loading}
     rightIcon={{name: 'check'}}
     backgroundColor='#3D6DCC'

     />  
     <Snackbar
          duration={1000}
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Done',
            onPress: () => {
              // Do something
            },
          }}
        >
          {this.state.msg}
        </Snackbar>
       
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
    alignSelf: 'center',
  },
  Text:{
    padding:6,
  },
  Total:{
    paddingHorizontal: 5,
  },
  data:{
    // flex:4,
    // alignContent: 'center',
    // justifyContent:'center',
    // paddingLeft:40
    // alignSelf:'stretch' 
    padding:6
  }

});
