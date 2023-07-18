import { ImageBackground, StyleSheet, View , Text, TouchableOpacity} from "react-native"
import { colors } from "../styles"
import { MultiStepFormEnums } from "./MultiStepFormEnums"

const Header_background = require("../assets/Form-Background.jpg")

export default function MainHeader(props) {

  return (
    <ImageBackground source={Header_background} style={styles.imgHeaderBG}>
   
     <TouchableOpacity onPress={e => {
              props.handleChangeStep(1)
            }}
            style={styles.ellipse}>
          <View  style={styles.steps} ><Text>{MultiStepFormEnums.PersonalInfo}</Text></View> 
      </TouchableOpacity>
      <TouchableOpacity onPress={e => {
              props.handleChangeStep(2)
            }}
            style={styles.ellipse}>
          <View style={styles.steps}><Text >{MultiStepFormEnums.SelectyourPlan}</Text></View> 
      </TouchableOpacity>
      <TouchableOpacity onPress={e => {
              props.handleChangeStep(3)
            }}
            style={styles.ellipse}>
          <View style={styles.steps}><Text >{MultiStepFormEnums.PickAddons}</Text></View> 
      </TouchableOpacity>
      <TouchableOpacity onPress={e => {
              props.handleChangeStep(4)
            }}
            style={styles.ellipse}>
          <View style={styles.steps}><Text >{MultiStepFormEnums.Finishingup}</Text></View> 
      </TouchableOpacity>
    </ImageBackground>
    
  )
}

const styles = StyleSheet.create({
  imgHeaderBG: {
    height: 200,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    
  },
  steps:{
  marginTop:'20%',
//  marginLeft:'10%',
  },
  ellipse: {
    width: 40,
    height: 40,
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginRight:10,
    marginLeft:30,
    borderColor: colors.white.color,
    borderWidth: 1,
    backgroundColor: colors.skyBlue.color
 
  },
 
})
