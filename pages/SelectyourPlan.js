import { StyleSheet, Switch, View, Text} from "react-native"
import { colors, globalStyles } from "../styles"
import { PageHeader } from "../components/PageHeader"
import { useEffect } from "react"
import { Options } from "../components/Options"
import { MultiStepFormEnums } from "../components/MultiStepFormEnums"
export function SelectyourPlan(props) {
  const PlanType = ["Monthly" , "Yearly"]
  const step = MultiStepFormEnums.SelectyourPlan
  const SELECT_PLAN = [
    {
      label: "Arcade",
      price: {
        monthly: 9,
        yearly: 90
      },
      logo: ""
    },
    {
      label: "Advanced",
      price: {
        monthly: 12,
        yearly: 120
      },
      logo:""
    },
    {
      label: "Pro",
      price: {
        monthly: 15,
        yearly: 150
      },
      logo: ""
    }
  ]
  
  function handleChange() {
    if (props.togglePlanType) {
      props.togglePlanType()
    }
  }

  useEffect(() => {
    if (props.currentStep === step - 1) {
      props.navigation.navigate("PersonalInfo")
    }
    if (props.currentStep === step + 1) {
      props.navigation.navigate("PickAddons")
    }
  }, [props.currentStep])
  return (
    <>
      <View style={globalStyles.stepContainer}>
        <View style={globalStyles.stepSubContainer}>
          <PageHeader
            title="Select your plan"
            subtitle="You have the option of monthly or yearly billing."
            style={styles.header}
          />
          {props.errors.plan && (
            <Text fontWeigth="bold" customStyle={styles.error}>
              {props.errors.plan}
            </Text>
          )}

          {SELECT_PLAN.map(plan => {
            const price =
              props.planType === "Monthly"
                ? plan.price.monthly
                : plan.price.yearly
            const priceStr =
              props.planType === "Monthly" ? `$${price}/mo` : `$${price}/yr`
            return (
              <View style={styles.option} key={`option-${plan.label}`}>
                <Options
                  label={plan.label}
                  handleSelectOption={props.handlePlanSelected}
                  optionSelected={props.planSelected}
                  logo={plan.logo}
                  price={priceStr}
                />
              </View>
            )
          })}
          <View style={styles.switchPlanType}>
            <Text
              customStyle={[
                styles.planTypeText,
                {
                  color:
                    props.planType === "Monthly"
                      ? colors.denim.color
                      : colors.grey.color
                }
              ]}
              fontWeigth="medium"
            >
              Monthly
            </Text>
            <Switch
              thumbColor={colors.white.color}
            
              onChange={handleChange}
              value={props.planType === "Monthly" ? false : true}
            />
            <Text
             
             
            >
              Yearly
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 6
  },
  option: {
    marginTop: 12
  },
  error: {
    color: colors.red.color,
    marginTop: 10
  },
  switchPlanType: {
    backgroundColor: colors.veryLightGrey.color,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    height: 48
  },
  planTypeText: {
    marginHorizontal: 24
  }
})
