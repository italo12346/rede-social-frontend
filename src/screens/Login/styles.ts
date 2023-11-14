import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    height:"100%",
    backgroundColor:'#0000',
    justifyContent:"center",
    alignItems:"center"
  },
  containerForm:{
    width:"100%",
    height:"80%",
    justifyContent:"center",
    alignItems:"center",
    borderBottomColor:"#CECECE",
    borderBottomWidth:2
  },
  title:{
    color:'#000',
    fontSize:34,
    fontWeight:'bold',
    marginBottom:20
  },
  input:{
    width:"80%",
    height:"8%",
    backgroundColor:'#D9D9D9',
    fontSize:14,
    color:'#FDFCFE',
    padding:12,
    borderRadius:14,
    marginVertical:5
  },
  singUp:{
    marginTop:"5%",
    marginBottom:"-40%",
    height:"20%",
    width:"100%",
    alignItems:"center"
  },
  buttom:{
    width:"80%",
    height:"8%",
    color:"#fff",
    backgroundColor:"#2E4374",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:14

  }
 
})