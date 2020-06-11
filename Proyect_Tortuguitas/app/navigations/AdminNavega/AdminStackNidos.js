import { createStackNavigator } from "react-navigation-stack";
import ScreenNidos from "../../screens/Administrador/ScreenTortugaAdmin";


const AgregarScreenStacks = createStackNavigator({
  Nidos: {
    screen: ScreenNidos,
    navigationOptions: () => ({
      title: "Todos los nidos"
    })
  }
});

export default AgregarScreenStacks;