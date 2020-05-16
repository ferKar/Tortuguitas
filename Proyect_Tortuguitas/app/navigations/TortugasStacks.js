import { createStackNavigator } from "react-navigation-stack";
import Tortugas from "../screens/Tortugas/Tortugas";
import AddTortuga from "../screens/Tortugas/AddTortuga"

const TortugasScreenStacks = createStackNavigator({
  Tortugas: {
    screen: Tortugas,
    navigationOptions: () => ({
      title: "Mis tortugas"
    })
  },

  AddTortuga:{
    screen: AddTortuga,
    navigationOptions: () => ({
      title: "Añadir tortuga"
    })

  }

});

export default TortugasScreenStacks;
