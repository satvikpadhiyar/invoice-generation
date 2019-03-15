import { createStackNavigator,createAppContainer,createSwitchNavigator,createDrawerNavigator,DrawerItems,SafeAreaView} from 'react-navigation';
import { ScrollView,Text,View,StyleSheet } from "react-native";
import  Coust  from "./Screens/Coust";
import AddItem from "./Screens/AddItem";
import Login from './Screens/Login';
import AuthLoading from './Screens/AuthLoading';
import Contacts from './Screens/Contacts';
import ViewInvoice from './Screens/ViewInvoice';
import Checkout from './Screens/Checkout';
import sales from './Screens/sales';
import mahalaxmisale from './Screens/mahalaxmisale';
const AuthStack = createStackNavigator({ Login:{
  screen:Login,
 navigationOptions: ({ navigation }) => ({
   header: null,
 }),
  }
});

 const AppStack = createDrawerNavigator({ 
  Coust:{
    screen:Coust,
   navigationOptions: ({ navigation }) => ({
     header: null,
   }),
    },
  
  Contacts:{
      screen:Contacts,
     navigationOptions: ({ navigation }) => ({
       header: null,
     }),
      },
      ViewInvoice:ViewInvoice,
      sales:sales,
      mahalaxmisale:mahalaxmisale,
 
  
  AddItem:{
    screen:AddItem,
   navigationOptions: ({ navigation }) => ({
     header: null,
   }),
    },
    Checkout:{
      screen:Checkout,
     navigationOptions: ({ navigation }) => ({
       header: null,
     }),
      },
   
   
 
},
{

  contentOptions: {
    // activeTintColor: '#e91e63',
    itemsContainerStyle: {
      marginVertical: 50,
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
  // contentComponent:CustomDrawerContentComponent
}

)
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
  <View style={{height:25,backgroundColor:'red'}}>

  </View>
    {/* <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}> */}
      {/* <DrawerItems {...props} />
      <Text>sdabkjds</Text> */}
    {/* </SafeAreaView> */}
  </ScrollView>
);


const App = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    AppStack:AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
); 
 export default createAppContainer(App) ;
 const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});