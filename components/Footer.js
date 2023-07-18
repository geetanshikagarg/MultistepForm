import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../styles';
import CustomButton from './CustomButton';
export default function Footer(props) {
  let buttons = <></>;
  const Button_names = {
    goBack: "Go Back",
    nextStep: "Next Step",
    confirm: "Confirm"
  }
    switch (props.currentStep) {
      case 1:
        buttons = (
          <CustomButton
            handlePress={e => {
              props.handleChangeStep(2)
            }}
          >
            {Button_names.nextStep}
          </CustomButton>
        )
        break
  
      case 2:
        buttons = (
          <>
            <CustomButton
              handlePress={e => {
                props.handleChangeStep(1)
              }}
            >
              {Button_names.goBack}
            </CustomButton>
            <CustomButton
              handlePress={e => {
                props.handleChangeStep(3)
              }}
            >
              {Button_names.nextStep}
            </CustomButton>
          </>
        )
        break
  
      case 3:
        buttons = (
          <>
            <CustomButton
              handlePress={e => {
                props.handleChangeStep(2)
              }}
              
            >
              {Button_names.goBack}
            </CustomButton>
            <CustomButton
              handlePress={e => {
                props.handleChangeStep(4)
              }}
            >
              {Button_names.nextStep}
            </CustomButton>
          </>
        )
        break
  
      case 4:
        buttons = (
          <>
            <CustomButton
              handlePress={e => {
                props.handleChangeStep(3)
              }} 
            >
              {Button_names.goBack}
            </CustomButton>
            <CustomButton
              handlePress={e => {
                props.handleChangeStep(5)
              }}
            >
              {Button_names.confirm}
            </CustomButton>
          </>
        )
        break
  
      default:
        buttons = <></>
        break
    }
  
    return (
      <>
      
          <View
            style={[
              styles.footerContainer,
              {
                justifyContent:
                  props.currentStep === 1 ? "flex-end" : "space-between"
              }
            ]}
          >
            {buttons}
          </View>
        
      </>
    )
  }
  
  const styles = StyleSheet.create({
    footerContainer: {
      height: 70,
       backgroundColor: colors.skyBlue.color,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding:20
    }
  })
  