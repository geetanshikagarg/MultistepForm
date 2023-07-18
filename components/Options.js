import { Pressable, StyleSheet, View, Text } from "react-native"
import { colors } from "../styles"

export function Options(props) {
  function handlePress() {
    props.handleSelectOption(props.label)
  }

  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              props.optionSelected === props.label
                ? colors.veryLightGrey.color
                : colors.white.color,
            borderColor:
              props.optionSelected === props.label
                ? colors.purple.color
                : colors.lightGrey.color
          }
        ]}
      >
        {props.logo}
        <View style={styles.labelPriceContainer}>
          <Text >{props.label}</Text>
          <Text customStyle={styles.price}>{props.price}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 77,
    borderRadius: 8,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16
  },
  labelPriceContainer: {
    marginLeft: 14
  },
  price: {
    color: colors.grey.color,
    marginTop: 7
  }
})
