import { createStackNavigator } from "react-navigation-stack";
import MapaLocalizacion from "../../screens/Administrador/ScreenMapaAdmin";


const AgregarScreenStacks = createStackNavigator({
  Mapa: {
    screen: MapaLocalizacion,
    navigationOptions: () => ({
      title: "Localización de Avistamientos"
    })
  }
});

export default AgregarScreenStacks;