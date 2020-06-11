import { createStackNavigator } from "react-navigation-stack";
import ScreenAdmin from "../../screens/Administrador/UserLogAdmin";


const AgregarScreenStacks = createStackNavigator({
  Administrador: {
    screen: ScreenAdmin,
    navigationOptions: () => ({
      title: "Administrador"
    })
  }
});

export default AgregarScreenStacks;