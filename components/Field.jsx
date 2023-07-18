import React from 'react-native';
import { View , Text, TextInput} from "react-native";

import { useState } from "react"

export function Field(props) {
  const [isFocus, setIsFocus] = useState(false);

  function handleChangeText(text) {
    if (props.handleChange) {
      props.handleChange(props.name, text);
    }
  }

  return (
    <>
      <View style={styles.labelErrorContainer}>
        <Text>{props.label}</Text>
        <Text fontWeigth='bold' customStyle={styles.errorMessage}>
          {props.errorMessage}
        </Text>
      </View>
      <TextInput
        style={[
          styles.field,
          {
            borderColor: isFocus
              ? '#483EFF'
              : props.errorMessage !== '' && props.errorMessage !== undefined
              ? '#EE374A'
              : '#D6D9E6',
          },
        ]}
        placeholder={props.placeholder}
        placeholderTextColor={"#9699AA"}
        maxLength={props.maxLenght}
        onEndEditing={(e) => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
        value={props.value}
        onChangeText={handleChangeText}
      />
    </>
  );
}

const styles = {
  labelErrorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  errorMessage: {
    color:'#EE374A',
  },
  field: {
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    fontSize: 15,
    color: '#022959',
  },
};
