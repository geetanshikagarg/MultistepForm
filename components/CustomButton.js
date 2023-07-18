import {  Pressable, Text } from "react-native"

export default function CustomButton(props) {

  return (
   
      <Pressable
        onPress={props.handlePress}
      
      >
        <Text size="M" fontWeigth="medium">
          {props.children}
        </Text>
      </Pressable>

  )
}
