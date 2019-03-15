import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions,ScrollView,FlatList,TextInput,NetInfo,AsyncStorage } from 'react-native';
import{Card,ListItem,Header,Button} from "react-native-elements";
import { WebBrowser } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});
export default class ViewInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
     paid:0,
     discount:0,
     pending:0,
     change:0,
     famount:0
     
    };
    
  }
  sgout= async () => {


    await AsyncStorage.clear();
    this.props.navigation.navigate('Login')    
 }
  
  static navigationOptions = {
    drawerLabel:()=>null,
    header: null, 

  };
  componentWillMount()
  {
    const { navigation } = this.props;
    const amount = navigation.getParam('amount', 'NO-Data');
  



    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState({ isConnected });
        
      } else {
        this.setState({ isConnected });
       
      }  
    });
  
    this.setState({famount:amount,pending:amount,amount:amount})
   
  }
  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
  
    } else {
      this.setState({ isConnected });
    }
  };
  

  onDiscount=dis=>{
  
      if(this.state.amount-dis>0)
    this.setState({discount:dis,famount:this.state.amount-dis,pending: this.state.paid<(this.state.amount-dis)?this.state.amount-this.state.paid-dis:0,change:this.state.paid>(this.state.amount-dis)?this.state.paid-this.state.amount+dis*1:0})
    else
        {alert("Invalid"); 
        this.setState({discount:0}) 
        }  
}
  onPaid=paid=>{
    // console.log(this.state.discount)
    if(paid>this.state.famount)
     this.setState({paid:paid,change:paid-this.state.famount,pending:0})
     else
     this.setState({paid:paid,change:0,pending:this.state.famount-paid})
  }
  async checkout(){
    this.setState({loading:true})
    const { navigation } = this.props;
    const data_Coust = navigation.getParam('data_Coust', 'NO-Data');
    const {cName}=data_Coust;
    const {cCity}=data_Coust;
    const {cNumber}=data_Coust;
    const amount = this.state.famount;
    const price = navigation.getParam('price', 'NO-Data');
    const userToken = await AsyncStorage.getItem('user');
    const Quantity = navigation.getParam('Quantity', 'NO-Data');
    const ItemName = navigation.getParam('ItemName', 'NO-Data');
    const DNO = navigation.getParam('DNO', 'NO-Data');
    const branch = navigation.getParam('branch', 'NO-Data');
    const {discount}=this.state;
    const {pending}=this.state;
   



   if(this.state.isConnected){
   fetch('', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         
         price:price,
         Quantity:Quantity,
         ItemName:ItemName,
         DNO:DNO,
         branch:branch,
         amount:amount,
         cName:cName,
         cCity:cCity,
         cNumber:cNumber,
         user:userToken,
         discount:discount,
         pending:pending  

          })
     }).then(response => console).then(responseJson => {
         
       // if(responseJson!="logout"){
        //  console.log(responseJson)
    this.setState({loading:false})

     
       const ans = responseJson;
       if(ans!="logout" && ans!="Error" )
         {
           billno=responseJson;
           WebBrowser.openBrowserAsync( ``);
           this.props.navigation.dispatch(resetAction);
           
         }
         else
        {
         alert("something went wrong please try again later")
         this.setState({loading:false})
         this.sgout();
       }
         
       // }else{
       //   this._sgout;
       // }
        
       })
     
     }
     else{
       this.setState({loading:false})
       alert("No Internet")
     }

  }


 


  render() {
    

    
    return (
      <View style={styles.container}>
      
       <Header leftComponent={{ icon: 'menu', color: '#fff',onPress:()=>{this.props.navigation.openDrawer();} }}
  centerComponent={{ text: 'View Invoice', style: { color: '#fff' } }}
  rightComponent={{ icon: 'clear', color: '#fff',onPress:()=>{this.props.navigation.dispatch(resetAction);} }}/>
      
      
     <View style={{flex:1}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Text style={styles.showText}>Amount: </Text>
                <Text style={styles.showText}>{this.state.amount}</Text>

                <View style={{flex:1,alignItems:'flex-end',paddingRight:9}}>
                            <TextInput style={styles.TextInput}  placeholder="Paid " underlineColorAndroid="black"
                             onChangeText ={paid=>this.onPaid(paid)}    
                             keyboardType="numeric"
                                />
                 </View>

            </View>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Text style={styles.showText}>Pending: </Text>
                <Text style={styles.showText}>{this.state.pending}</Text>

                <View style={{flex:1,alignItems:'flex-end',paddingRight:9}}>
                            <TextInput style={styles.TextInput}  placeholder="Round Off " underlineColorAndroid="black"
                             onChangeText ={dis=>this.onDiscount(dis)}
                            //  value={this.state.discount.toString()}    
                             keyboardType="numeric"
                                />
                 </View>

            </View>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Text style={styles.showText}>Change: </Text>
                <Text style={styles.showText}>{this.state.change}</Text>

                
            </View>
            <View style={{flex:1,alignItems:'center',paddingTop:10}}>
            <Text style={styles.showText}>Final Amount: </Text>
                <Text style={styles.showText}>{this.state.famount}</Text>

                 </View>

        
    </View>
         
    <Button title="Save and Print" buttonStyle ={{height:50,width:300,borderRadius:30,alignSelf:'center',marginBottom:10}} 
    onPress={this.checkout.bind(this)}
    loading={this.state.loading}
     disabled={this.state.loading}
     rightIcon={{name: 'check'}}
     backgroundColor='#3D6DCC'

     />  
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
     flex: 1,
    //  marginTop: 15,
     backgroundColor:'white'

    
  },
  Text:{
    padding:6,
  },
  Total:{
    paddingHorizontal: 5,
  },
  data:{
    flex:6,
    paddingVertical: 5,
    alignContent: 'center',
    justifyContent:'space-around',
    // paddingLeft:40
    alignSelf:'flex-end', 
    // padding:6
  },
  dataText:{
    alignSelf:'center'
  },
  showText:{
      fontSize:20
  },    
  TextInput:{
    fontSize:20,
    height:45,
    width:100,
    marginTop:-10,

    // alignSelf: 'center',
  },
  dataText:{
    alignSelf:'center'
  }


});