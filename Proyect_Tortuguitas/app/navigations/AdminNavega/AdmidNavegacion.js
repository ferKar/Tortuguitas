import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

//ADmin
import AdminStackBusqueda from "../AdminNavega/AdminStackBusqueda";
import AdminStackTortugas from "../AdminNavega/AdminStackTortugas";
import AdminStackNidos from "../AdminNavega/AdminStackNidos";
import AdminStackMap from "../AdminNavega/AdminStackMapa";
import AdminStackCuenta from "../AdminNavega/AdminStackCuenta";
//
import ScreenBusNidos from "../../screens/Administrador/ScreenBusNidos";




const NavigationStacks = createBottomTabNavigator(
  {
     TortugasAd: {
      screen: AdminStackTortugas,
      navigationOptions: () => ({
        tabBarLabel: "Tortugas T",
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

      Busqueda: {
      screen: AdminStackBusqueda,
      navigationOptions: () => ({
        tabBarLabel: "Busqueda Tortuga",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="magnify"
            size={24}
            color={tintColor}
          />
        )
      })
    },   


    BuscarMap: {
      screen: AdminStackMap,
      navigationOptions: () => ({
        tabBarLabel: "Mapa",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="map-search-outline"
            size={24}
            color={tintColor}
          />
        )
      })
    },
    Cuenta: {
      screen: AdminStackCuenta,
      navigationOptions: () => ({
        tabBarLabel: "Cuenta Admin",
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
    NidosAd: {
      screen: AdminStackNidos,
      navigationOptions: () => ({
        tabBarLabel: "Nidos T",
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
    initialRouteName: "Cuenta",
    order: ["TortugasAd", "NidosAd", "BuscarMap","Busqueda", "Cuenta" ],
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);

export default createAppContainer(NavigationStacks);
