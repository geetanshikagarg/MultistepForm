import { StyleSheet, View } from "react-native";
import { colors, globalStyles } from "../styles";
import { PageHeader } from "../components/PageHeader";
import { useEffect, useState } from "react";
import { Addon, AddonsPicker } from "../components/AddonsPicker";
import { MultiStepFormEnums } from "../components/MultiStepFormEnums";
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
  
function PickAddons(props) {
    const step = MultiStepFormEnums.PickAddons;

    useEffect(() => {
        if (props.currentStep === step - 1) {
            props.navigation.navigate("SelectyourPlan");
        }
        if (props.currentStep === step + 1) {
            props.navigation.navigate("Finishingup");
        }
    }, [props.currentStep]);

    return (
        <>
            <View style={globalStyles.stepContainer}>
                <View style={globalStyles.stepSubContainer}>
                    <PageHeader
                        title="Pick add-ons"
                        subtitle="Add-ons help enhance your gaming experience."
                    />
                    <View style={styles.addonsPicker}>
                        <AddonsPicker
                            addonsChecked={props.addonsChecked}
                            handleCheckAddon={props.handleChangeAddons}
                        >
                            {pick_add_ons.map((addon) => {
                                const additionalPriceStr =
                                    props.planType === "Monthly"
                                        ? `+$${addon.additionalPrice.monthly}/mo`
                                        : `+$${addon.additionalPrice.yearly}/yr`;
                                return (
                                    <Addon
                                        key={addon.name}
                                        name={addon.name}
                                        description={addon.description}
                                        additionnalPrice={additionalPriceStr}
                                    />
                                );
                            })}
                        </AddonsPicker>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    addon: {
        marginTop: 10,
    },
    addonsPicker: {
        marginTop: 10,
    },
});

export { PickAddons };
