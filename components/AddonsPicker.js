import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles';
import React, { ReactNode, cloneElement } from 'react';

function AddonsPicker(props) {
  const clonedChildren = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return cloneElement(child, { addonsChecked: props.addonsChecked, handleCheckAddon: props.handleCheckAddon });
    }
    return child;
  });

  return (
    <>
      {clonedChildren}
    </>
  );
}

function Addon(props) {
  const isChecked = props.addonsChecked?.includes(props.name);

  return (
    <Pressable onPress={() => props.handleCheckAddon?.(props.name)}>
      <View style={[
        styles.container,
        {
          backgroundColor: isChecked ? colors.veryLightGrey.color : colors.white.color,
          borderColor: isChecked ? colors.purple.color : colors.lightGrey.color,
        }
      ]}>
        <View style={[
          styles.checkbox, {
            borderWidth: isChecked ? 0 : 1,
            borderColor: isChecked ? "transparent" : colors.lightGrey.color,
            backgroundColor: isChecked ? colors.purple.color : "transparent",
          }]}>
          {isChecked }
        </View>
        <View style={styles.textContainer}>
          <Text fontWeigth='medium'>{props.name}</Text>
          <Text size='S' customStyle={styles.description}>{props.description}</Text>
        </View>
        <Text size='S' customStyle={styles.additionalPrice}>{props.additionnalPrice}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 62,
    borderRadius: 8,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    marginTop: 12,
  },
  labelPriceContainer: {
    marginLeft: 14,
  },
  price: {
    color: colors.grey.color,
    marginTop: 7,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 24,
    display: "flex",
    flex: 1,
  },
  description: {
    color: colors.grey.color,
    marginTop: 3,
  },
  additionalPrice: {
    marginHorizontal: 16,
    color: colors.purple.color,
  },
});

export { AddonsPicker, Addon };
