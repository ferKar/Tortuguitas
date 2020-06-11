import { createStackNavigator } from "react-navigation-stack";
import ScreenTortugas from "../../screens/Administrador/ScreenTortugaAdmin";


const AgregarScreenStacks = createStackNavigator({
  Tortugas: {
    screen: ScreenTortugas,
    navigationOptions: () => ({
      title: "Todas las Tortugas"
    })
  }
});

export default AgregarScreenStacks;