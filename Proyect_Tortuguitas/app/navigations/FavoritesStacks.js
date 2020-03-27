import { createStackNavigator } from "react-navigation-stack";
import AgregarScreen from "../screens/AgregarTN";

const AgregarScreenStacks = createStackNavigator({
  AgregarTN: {
    screen: AgregarScreen,
    navigationOptions: () => ({
      title: "Subir avistamiento de tortuga/nido"
    })
  }
});

export default AgregarScreenStacks;
