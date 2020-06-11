import { createStackNavigator } from "react-navigation-stack";
import MapaScreen from "../screens/MapaCS";

const MapaScreenStacks = createStackNavigator({
  MapaCS: {
    screen: MapaScreen,
    navigationOptions: () => ({
      title: "Mapa de las tortugas/Busqueda",
    }),
  },
});

export default MapaScreenStacks;
