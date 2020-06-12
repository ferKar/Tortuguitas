import { createStackNavigator } from "react-navigation-stack";
import ScreenNidos from "../../screens/Administrador/ScreenNidosAdmin";
import AdminScreenNido from "../../screens/Nidos/Nido";

const AgregarScreenStacks = createStackNavigator({
  Nidos: {
    screen: ScreenNidos,
    navigationOptions: () => ({
      title: "Todos los nidos"
    })
  },

  Nido: {
     screen: AdminScreenNido,
    navigationOptions: props => ({   
      title : "Nido"
      //title: props.navigation.state.params.nido.nombre
    })
  }


});

export default AgregarScreenStacks;