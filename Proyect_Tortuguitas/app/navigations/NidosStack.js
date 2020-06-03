import { createStackNavigator } from "react-navigation-stack";
import Nidos from "../screens/Nidos/Nidos";
import AddNido from "../screens/Nidos/AddNido"
import NidoScreen from "../screens/Nidos/Nido"


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

  },
  Nido: {
    
    screen: NidoScreen,
    navigationOptions: props => ({   
      title : "Nido"
      //title: props.navigation.state.params.nido.nombre
    })
  }

});

export default NidosScreenStacks;
