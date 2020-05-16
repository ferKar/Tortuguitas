import { createStackNavigator } from "react-navigation-stack";
import Nidos from "../screens/Nidos/Nidos";
import AddNido from "../screens/Nidos/AddNido"

const NidosScreenStacks = createStackNavigator({
  Nidos: {
    screen: Nidos,
    navigationOptions: () => ({
      title: "Mis Nidos"
    })
  },

  AddNido:{
    screen: AddNido,
    navigationOptions: () => ({
      title: "Añadir Nido"
    })

  }

});

export default NidosScreenStacks;
