import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { globalStyles } from "../styles";
import { PageHeader } from "../components/PageHeader";
import { Field } from "../components/Field";
import { MultiStepFormEnums } from "../components/MultiStepFormEnums";
const Personal_fields_data = [
  {
    name: "name",
    label: "Name",
    placeHolder: "e.g. Stephen King",
    keyboardType: "default",
    maxLength: 20
  },
  {
    name: "email",
    label: "Email Address",
    placeHolder: "e.g. stephenking@lorem.com",
    keyboardType: "email-address",
    maxLength: 50,
    autoCapitalize: "none",
    autoCorrect: false
  },
  {
    name: "phone",
    label: "Phone Number",
    placeHolder: "e.g. +1 234 567 890",
    keyboardType: "numeric",
    maxLength: 10
  }
]


export function PersonalInfo(props) {
const step = MultiStepFormEnums.PersonalInfo

  useEffect(() => {
    if (props.currentStep === step + 1) {
      props.navigation.navigate("SelectyourPlan")
    }
  }, [props.currentStep])
  
  return (
    <View style={globalStyles.stepContainer}>
      <View style={globalStyles.stepSubContainer}>
        <PageHeader
          title="Personal info"
          subtitle="Please provide your name, email address, and phone number."
          style={styles.header}
        />
        {Personal_fields_data.map((input) => {
          return (
            <View style={styles.field} key={input.name}>
              <Field
                name={input.name}
                label={input.label}
                placeholder={input.placeHolder}
                keyboardType={input.keyboardType}
                maxLenght={input.maxLength}
                handleChange={props.handleChangeInfo}
                value={props.personalInfo[input.name]}
                errorMessage={props.errors[input.name]}
              
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 6,
  },
  field: {
    marginTop: 16,
  },
});

