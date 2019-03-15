import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <Image style={{width: 250,marginTop:100, height:200}}
           source={require('../../assets/logo_transparent.png')}/>
            {/* <Text style={styles.logoText}>
            Depstar
              </Text> */}
            </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      //paddingVertical: ,
      justifyContent:'center',
      alignItems: 'center',
      paddingHorizontal:16,
     marginVertical:0
    },
    logoText : {
        fontSize :35,
        marginVertical: 15,
      //  paddingBottom: 300,
        color:'rgba(255,255,255,0.7)',
        paddingHorizontal:16
    }
  });
