import React, { Component } from 'react';
import { View, Text,StyleSheet,Linking,NetInfo,ScrollView,FlatList,TouchableOpacity,ActivityIndicator ,Alert} from 'react-native';
import{Card,ListItem,Header,Button} from "react-native-elements";
import { Snackbar } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { WebBrowser } from 'expo';

export default class ViewInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      data: [],
      isConnected: true,
      visible:false,
      msg:''
    };
    
  }
  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
     
    } else {
      this.setState({ isConnected });
    }
  };
  
  static navigationOptions = {
    drawerLabel:()=>null,
    header: null, 

  };
  

   componentWillMount()
{
  
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
onPaid=async ()=>{
  const { navigation } = this.props;
  const data = navigation.getParam('data', 'NO-Data');
  const bill_no=data.bill_no;
  this.setState({isLoading:true})
  if(this.state.isConnected){   
    {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        bill_no: bill_no,
      })

    }).catch(err => console.error('An error occurred', err));
    const json = await response.json();
    this.setState({msg:json,visible:true,isLoading:false})
  }
  else{
    this.setState({msg:"No Internet",visible:true,isLoading:false})
  }
}
onPending=()=>{
  Alert.alert(
    'Paid',
    'Are You sure you want to make it paid ? ',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.onPaid()},
    ],
    {cancelable: false},
  );
}
shouldCall=call=>{
  this.fetchData(); 
};
_reprint=()=>{
  const { navigation } = this.props;
  const data = navigation.getParam('data', 'NO-Data');
  const bill_no=data.bill_no;
  if(this.state.isConnected){   
      
  }else{
    this.setState({msg:"No Internet",visible:true})
  }

}
fetchData = async ()=>{
  const { navigation } = this.props;
  const data = navigation.getParam('data', 'NO-Data');
  const bill_no=data.bill_no;
  this.setState({isLoading:true})

  if(this.state.isConnected){   
          {
         method:'POST',
         headers:{
           'Accept':'application/json',
           'Content-Type':'application/json'
         },
         body:JSON.stringify({

           bill_no: bill_no,


         })

       }).catch(err => console.error('An error occurred', err));
 const json = await response.json();
 this.arrayholder = json;
 console.log(json)

 this.setState({ data: json,isLoading:false });
     }
    else{
    this.setState({msg:"No Internet",visible:true,isLoading:false})

    }

}


  callNumber = (url) =>{
   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
}

  render() {
         const { navigation } = this.props;
        const data = navigation.getParam('data', 'NO-Data');
        

    return (
      <View style={styles.container}>
      
       <Header leftComponent={{ icon: 'menu', color: '#fff',onPress:()=>{this.props.navigation.openDrawer();} }}
  centerComponent={{ text: 'View Invoice', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff',onPress:()=>{this.props.navigation.navigate('Coust');} }}/>
      <Card >
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontSize:15,padding:10,fontWeight:'600'}}>Bill no: {data.bill_no} </Text>
      <Icon name="date-range" style={{fontSize:20,padding:10}}/><Text style={{fontSize:15,padding:10}}>{data.date} </Text>
      
      </View>
     
    <ListItem
    title={`${data.cName}`}
    titleStyle={{fontSize:15,}}   
    subtitle={`₹ ${data.amount}`}
    chevronColor="white"
        chevron
    />
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Icon name="location-city" style={{fontSize:20,padding:10}}/><Text style={{fontSize:15,padding:10}}>{data.cCity} </Text>
     <TouchableOpacity onPress={()=>this.callNumber(`tel:+91${data.cNumber}`)}> 
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
     <Icon name="phone" style={{fontSize:20,padding:10}}/><Text style={{fontSize:15,padding:10}}>{data.cNumber}</Text>
     </View>
     </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row'}}>
      <Text> Sold By: {data.soldby}</Text>
<View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
      <Button
        containerViewStyle={{paddingLeft:50}}
       
        icon={{
    name: "print",
    size: 40,
    color: "#2196f3"
  }}
        buttonStyle ={{height:50,marginTop:20}} 
        type="outline"
        backgroundColor="white"
        onPress={this._reprint.bind(this)}
      />
     <TouchableOpacity onPress={this.onPending}>
     
    
       {/* data.pending==0?<Text style={{color:"red",marginRight:10,padding:2}}> {`Pending:${data.pending}`}</Text>:<Text style={{color:"green",marginRight:10,padding:2}}>Paid</Text> */}
     {data.pending!=0?<Text style={{color:"red",marginRight:10,padding:2}} >{`Pending: ${data.pending}`}</Text>:null}
   
     </TouchableOpacity>
</View>
      </View>
      </Card> 
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
        {
          this.state.isLoading?<View style={{flex: 1,alignItems:'center',justifyContent:'center', paddingTop: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
          <Text>Fetching Data Please Wait....</Text>
        </View>
: <FlatList
data={this.state.data}
keyExtractor={(x,i)=> i}
renderItem={({item}) =>
<View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
        <View style={styles.data}>
       <Text style={styles.dataText}>{item.item_name}</Text> 
        </View>
        <View style={styles.data}>
        <Text style={styles.dataText}>{item.DNO}</Text>
        </View>
        <View style={styles.data}>
        <Text style={styles.dataText}>{item.branch}</Text>
        </View>
        <View style={styles.data}>
        <Text style={styles.dataText}>{item.quantity}</Text>
        </View>
        <View style={styles.data}>
        <Text style={styles.dataText}>{item.price}</Text> 
               </View>
        <View style={styles.data}>
          <Text style={styles.dataText}>{item.price*item.quantity}</Text>
        </View>
        </View>
}

  />
        }        
        </ScrollView>
        
        <View style={{backgroundColor:'#d3d3d3',flex:0.1,justifyContent:'flex-end',flexDirection:"row",marginHorizontal:10,marginBottom:10}}> 
    
    
    <Text style={styles.Total}>Total:</Text>
     <Text style={styles.Total}>{data.amount}</Text>
   </View>
    </View>
    
   
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
    //  marginTop: 15,
    marginBottom:5,
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
  }



});