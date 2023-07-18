import { Alert, StyleSheet, View , Text} from "react-native"
import { colors, globalStyles } from "../styles"
import { PageHeader } from "../components/PageHeader"
import { useEffect } from "react"
import { MultiStepFormEnums } from "../components//MultiStepFormEnums"

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
const pick_add_ons = [
  {
    name: "Online service",
    description: "Access to multiplayer games",
    additionalPrice: {
      monthly: 1,
      yearly: 10
    }
  },
  {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    additionalPrice: {
      monthly: 2,
      yearly: 20
    }
  },
  {
    name: "Customizable profile",
    description: "Custom theme on your profile",
    additionalPrice: {
      monthly: 2,
      yearly: 20
    }
  }
]

export function Finishingup(props) {
  // console.log(SELECT_PLAN,'SELECT_PLAN')
  const step = MultiStepFormEnums.Finishingup
  let planPrice = {
    monthly: "",
    yearly: ""
  }
  let addonsChecked = []
  let totalPrice = { montly: 0, yearly: 0 }

  useEffect(() => {
    if (props.currentStep === step - 1) {
      props.navigation.navigate("PickAddons")
    }
   
 
  }, [props.currentStep])

 SELECT_PLAN.find(p => {
    if (p.label === props.planSelected) {
      planPrice = {
        monthly: `$${p.price.monthly}/mo`,
        yearly: `$${p.price.yearly}/yr`
      }
      addToTotal(p.price.monthly, p.price.yearly)
    }
  })

  pick_add_ons.forEach(a => {
    if (props.addonsChecked.includes(a.name)) {
      addonsChecked.push({
        name: a.name,
        additionalPrice: {
          monthly: `+$${a.additionalPrice.monthly}/mo`,
          yearly: `+$${a.additionalPrice.yearly}/yr`
        }
      })
      addToTotal(a.additionalPrice.monthly, a.additionalPrice.yearly)
    }
  })

  function addToTotal(monthly, yearly) {
    totalPrice = {
      montly: totalPrice.montly + monthly,
      yearly: totalPrice.yearly + yearly
    }
  }

 

  return (
    <>
      <View style={globalStyles.stepContainer}>
        {props.formIsSubmit ? (
          Alert.alert('Thank you for submitting!')
        ) : (
          <View style={globalStyles.stepSubContainer}>
            <PageHeader
              title="Finishing up"
              subtitle="Double-check everything looks OK before confirming."
            />
            <View style={styles.summary}>
              <View style={[styles.planTypeContainer, styles.line]}>
                <View>
                  <Text fontWeigth="medium" customStyle={styles.plan}>
                    {props.planSelected} ({props.planType})
                  </Text>
                    <Text >Change</Text>
                </View>
                <Text fontWeigth="bold" customStyle={styles.plan}>
                  {props.planType === "Monthly"
                    ? planPrice.monthly
                    : planPrice.yearly}
                </Text>
              </View>
              <View style={styles.separator} />
              {addonsChecked.map(addon => {
                return (
                  <View
                    style={[styles.addon, styles.line]}
                    key={`addon-${addon.name}`}
                  >
                    <Text customStyle={styles.addonName}>
                      {addon.name}
                    </Text>
                    <Text>
                      {props.planType === "Monthly"
                        ? addon.additionalPrice.monthly
                        : addon.additionalPrice.yearly}
                    </Text>
                  </View>
                )
              })}
            </View>
            <View style={[styles.line, styles.total]}>
              <Text>
                Total (per {props.planType === "Monthly" ? "month" : "year"})
              </Text>
              <Text
                size="L"
                fontWeigth="bold"
                customStyle={styles.totalPrice}
              >
                $
                {props.planType === "Monthly"
                  ? totalPrice.montly.toString() + "/mo"
                  : totalPrice.yearly.toString() + "/yr"}
              </Text>
            </View>
          </View>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  summary: {
    backgroundColor: colors.veryLightGrey.color,
    padding: 15,
    marginTop: 20
  },
  line: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  planTypeContainer: {
    alignItems: "center"
  },
  plan: {
    color: colors.denim.color,
    borderRadius: 8
  },
  togglePlan: {
    color: colors.grey.color,
    paddingTop: 3,
    textDecorationLine: "underline"
  },
  separator: {
    borderColor: colors.grey.color,
    borderBottomWidth: 1,
    opacity: 0.2,
    marginTop: 12
  },
  addon: {
    marginTop: 12
  },
  addonName: {
    color: colors.grey.color
  },
  total: {
    marginHorizontal: 16,
    marginTop: 24,
    display: "flex",
    alignItems: "center"
  },
  totalPrice: {
    color: colors.purple.color
  }
})
