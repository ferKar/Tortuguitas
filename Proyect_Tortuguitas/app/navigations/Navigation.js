import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TortugasFScreenStack from "./TortugasStacks";
import TortugasScreenStacks from "./TortugasStacks";
import AccountScreenStacks from "./AccountStacks";
import AgregarScreenStacks from "./AgregarStacks";
import NidosScreenStacks  from "./NidosStack";


const NavigationStacks = createBottomTabNavigator(
  {
     TortugaFS: {
      screen: TortugasFScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Mis tortugas",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="turtle"
            size={24}
            color={tintColor}
          />
        )
      })
    }, 

    /* Tortugas: {
      screen: TortugasScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Mis tortugas",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="turtle"
            size={24}
            color={tintColor}
          />
        )
      })
    },  */
    AgregarTN: {
      screen: AgregarScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Subir",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="upload"
            size={24}
            color={tintColor}
          />
        )
      })
    },
    Account: {
      screen: AccountScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Mi Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="home-outline"
            size={24}
            color={tintColor}
          />
        )
      })
    },
    Nidos: {
      screen: NidosScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Mis Nidos",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="egg-easter"
            size={24}
            color={tintColor}
          />
        )
      })
    }



  },
  {
    initialRouteName: "Account",
    order: ["TortugaFS", "Nidos", "AgregarTN", "Account"],
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);

export default createAppContainer(NavigationStacks);
