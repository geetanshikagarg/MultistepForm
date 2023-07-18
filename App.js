import React from 'react';
import { useState } from "react"
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { colors } from "./styles"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import { PersonalInfo } from "./pages/PersonalInfo"
import { SelectyourPlan } from "./pages/SelectyourPlan"
import { PickAddons } from "./pages/PickAddons"
import { Finishingup } from "./pages/Finishingup"
import { MultiStepFormEnums } from "./components/MultiStepFormEnums"
import { PageHeader } from "./components/PageHeader"
import Footer from './components/Footer';
import MainHeader from './components/MainHeader';
// import Personal from './components/Personal';
const Stack = createStackNavigator();


const App = () => {
  
  const Regex_name = /^[a-zA-ZÀ-ÖØ-öø-ÿ\u0300-\u036f]+([-\s'][a-zA-ZÀ-ÖØ-öø-ÿ\u0300-\u036f]+)*\s[a-zA-ZÀ-ÖØ-öø-ÿ\u0300-\u036f]+([-\s'][a-zA-ZÀ-ÖØ-öø-ÿ\u0300-\u036f]+)*$/ // Regex that match "name lastname" with accents, dash, etc... Source : ChatGPT 🤖👀
  const Regex_email = /^\s*(?:\+\d{1,3}\s*)?(?:\(\d{1,3}\)\s*)?[\w.-]*\w@(?:[\w-]+\.)+\w{2,}\s*$/
  const Regex_phone = /^\s*(?:\+\d{1,3}\s*)?(?:\(\d{1,3}\)\s*)?\d(?:[\s-]*\d){6,14}$/
  
  const Invalid_format = "The format is not correct"
  const Field_required = "This field is required"
  const selectplan_error = "Select a plan"
  
  const [step, setStep] = useState(MultiStepFormEnums.PersonalInfo)
  const [personalInfo, setPersonalInfo] = useState({ name: "",email: "",phone: "" })
  const [errorMessages, setErrorMessages] = useState({})
  const [planSelected, setPlanSelected] = useState("")
  const [planType, setPlanType] = useState("Monthly")
  const [addons, setAddons] = useState([])
  const [formIsSubmit, setFormIsSubmit] = useState(false)

 
  function handleSubmit() {
    // Actions to submit form...
    setFormIsSubmit(true);
  }

  function handleStepValidation(step) {
    let errors = {};
    setErrorMessages({});
    let stepFormIsValid = true;

    switch (step) {
      case 1:
        // Check name field
        if (!personalInfo.name.match(Regex_name) ) {
          errors["name"] = Invalid_format;
          stepFormIsValid = false;
        }

        // Check email field
        if (!personalInfo.email.match(Regex_email)) {
          errors["email"] = Invalid_format;
          stepFormIsValid = false;
        }

        if (!personalInfo.phone.match(Regex_phone)) {
          errors["phone"] = Invalid_format;
          stepFormIsValid = false;
        }

        for (const [key, value] of Object.entries(personalInfo)) {
          if (!value) {
            stepFormIsValid = false;
            errors = {
              ...errors,
              [key]:Field_required
            };
          }
        }

        setErrorMessages(errors);
        return stepFormIsValid;

      case 2:
        if (!planSelected) {
          errors = {
            plan: selectplan_error
          };
          stepFormIsValid = false;
        }

        setErrorMessages(errors);
        return stepFormIsValid;

      default:
        return stepFormIsValid;
    }
  }

  function handleChangeStep(stepToGo) {
    if (handleStepValidation(step)) {
      if (stepToGo !== 5) {
        setStep(stepToGo);
      }
      else {
        handleSubmit();
      }
    }
    else {
      console.log("Form invalid");
    }
  }

  function handleChangePersonalInfo(name , text) {
    setPersonalInfo({
      ...personalInfo,
      [name]: text
     
    });
  }

  function handlePress(i) {
    console.log('hi')
   if(i==1)
   {
  
    props.navigation.navigate("PersonalInfo")
   }
  }
  function togglePlanType() {
    const plan = planType === "Monthly" ? "Yearly" : "Monthly";
    setPlanType(plan);
  }

  function handleChangeAddons(label) {
    if (addons.includes(label)) {
      setAddons(addons.filter(addon => addon !== label));
    }
    else {
      setAddons([...addons, label]);
    }
  }

  function handleChangeAddons(label) {
    // If addon is in list, delete it
    if (addons.includes(label)) {
      setAddons(addons.filter(addon => addon !== label))
    }
    // Else, delete it
    else {
      setAddons([...addons, label])
    }
  }

  return (
  
    <>
      
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <MainHeader currentStep={step}
            handleChangeStep={handleChangeStep}
            formIsSubmit={formIsSubmit}
          />
          <View style={styles.stepContainer}>
            <NavigationContainer>
              <Stack.Navigator
              initialRouteName="PersonalInfo"
                // initialRouteName="FinishUp"
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="PersonalInfo">
                  {(props) =>
                    <PersonalInfo
                      {...props}
                      currentStep={step}
                      handleChangeInfo={handleChangePersonalInfo}
                      personalInfo={personalInfo}
                      errors={errorMessages}

                    />}
                </Stack.Screen>
               
          <Stack.Screen name="SelectyourPlan">
          {(props) =>
          <SelectyourPlan
          {...props}
          currentStep={step}
          planSelected={planSelected}
          planType={planType}
          handlePlanSelected={setPlanSelected}
          togglePlanType={togglePlanType}
          errors={errorMessages}
          />}
          </Stack.Screen>
         
    
      <Stack.Screen name="PickAddons">
      {(props) =>
      <PickAddons
      {...props}
      currentStep={step}
      planType={planType}
      addonsChecked={addons}
      handleChangeAddons={handleChangeAddons}
      />}
      </Stack.Screen>
      <Stack.Screen name="Finishingup">
      {(props) =>
      <Finishingup
      {...props}
      planSelected={planSelected}
      planType={planType}
      addonsChecked={addons}
      togglePlanType={togglePlanType}
      currentStep={step}
      formIsSubmit={formIsSubmit}
      />}
      </Stack.Screen> 
      </Stack.Navigator>
      </NavigationContainer>
    
      <Footer handleChangeStep={handleChangeStep}
      currentStep={step}
      formIsSubmit={formIsSubmit}
      />
     </View>
        </View>
      </TouchableWithoutFeedback>
    </>
    );
    };
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.color
  },
  stepContainer: {
    flex: 1,
    marginTop: -50
  },
  footerContainer: {
    height: 72,
    backgroundColor: colors.white.color,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16
  }
});

export default App;
