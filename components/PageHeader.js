import { StyleSheet, View , Text} from "react-native"
import React from 'react';

export function PageHeader(props) {
  return (
    <View style={props.style}>
      <Text>{props.title}</Text>
      <Text customStyle={styles.subtitle} size="L">
        {props.subtitle}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    color: '#9699AA',
    marginTop: 9
  }
})
