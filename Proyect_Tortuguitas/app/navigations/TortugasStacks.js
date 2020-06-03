import { createStackNavigator } from "react-navigation-stack";
//import Tortugas from "../screens/Tortugas/Tortugas";
import TortugaFScreen from "../screens/Tortugas/TortugaF";

import AddTortuga from "../screens/Tortugas/AddTortuga"
import TortugaScreen from "../screens/Tortugas/Tortuga";

const TortugasScreenStacks = createStackNavigator({
  
  TortugaFS: {
    screen: TortugaFScreen,
    navigationOptions: () => ({
      title: "Mis tortugas"
    })
  }, 

  /*  Tortugas: {
    screen: Tortugas,
    navigationOptions: () => ({
      title: "Mis tortugas"
    })
  },
 */
  AddTortuga:{
    screen: AddTortuga,
    navigationOptions: () => ({
      title: "Añadir tortuga"
    })

  },

  Tortuga: {
    screen: TortugaScreen,
    navigationOptions: props => ({
      title:"Tortuga"
      //title: props.navigation.state.params.tortuga.nombre
    })
  }

});

export default TortugasScreenStacks;
