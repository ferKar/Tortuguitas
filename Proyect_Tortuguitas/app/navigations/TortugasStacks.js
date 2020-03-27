import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "../screens/Tortugas";

const TortugasScreenStacks = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreen,
    navigationOptions: () => ({
      title: "Mis tortugas"
    })
  }
});

export default TortugasScreenStacks;
