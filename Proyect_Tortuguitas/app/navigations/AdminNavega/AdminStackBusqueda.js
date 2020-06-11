import { createStackNavigator } from "react-navigation-stack";
import ScreenBusqueda from "../../screens/Administrador/ScreenBusquedaAdmin";


const AgregarScreenStacks = createStackNavigator({
  Busqueda: {
    screen: ScreenBusqueda,
    navigationOptions: () => ({
      title: "Buscar Tortuga"
    })
  }
});

export default AgregarScreenStacks;