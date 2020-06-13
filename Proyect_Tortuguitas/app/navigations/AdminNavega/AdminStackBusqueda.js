import { createStackNavigator } from "react-navigation-stack";
import ScreenBusqueda from "../../screens/Administrador/ScreenBusquedaAdmin";

import ScreenBusNidos from "../../screens/Administrador/ScreenBusNidos";
import ScreenBusTortuga from "../../screens/Administrador/ScreenBusTortuga";

import Nido from "../../screens/Nidos/Nido"
import Tortuga from "../../screens/Tortugas/Tortuga";


const AgregarScreenStacks = createStackNavigator({
  Busqueda: {
    screen: ScreenBusqueda,
    navigationOptions: () => ({
      title: "Busqueda"
    })
  },

  NidoAdmB: {
    screen: Nido,
    navigationOptions: () => ({
      title: "Nido"
    })
  },

  TortugaAdmB:{
    screen: Tortuga,
    navigationOption: () => ({
      title: "Tortuga"
    })
  },


  BusquedaN: {
    screen: ScreenBusNidos,
    navigationOptions: () => ({
      title: "Buscar Nidos"
    })
  },

  BusquedaT:{
    screen: ScreenBusTortuga,
    navigationOptions: () =>({
      title: "Buscar Tortuga"
    })
  }

  

});

export default AgregarScreenStacks;