import { createStackNavigator } from "react-navigation-stack";
import ScreenTortugas from "../../screens/Administrador/ScreenTortugaAdmin";
import AdminScreenTortuga from "../../screens/Tortugas/Tortuga";

const AgregarScreenStacks = createStackNavigator({
  Tortugas: {
    screen: ScreenTortugas,
    navigationOptions: () => ({
      title: "Todas las Tortugas"
    })
  },
  Tortuga: {
    screen: AdminScreenTortuga,
   navigationOptions: props => ({   
     title : "Tortuga"
   })
 }
});

export default AgregarScreenStacks;