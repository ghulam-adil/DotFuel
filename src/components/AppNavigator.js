import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from './Login';
import SetPrice from './SetPrice';
import Tanks from './Tanks';
import Dispensers from './Dispensers';
import Dashboard from './Dashboard';
import Main from './Main';


//=============APPSTART=========================
const AppNavigator = createStackNavigator({
    login: { screen: Login },
    setprice: { screen: SetPrice },
    tanks: { screen: Tanks },
    dispensers: { screen: Dispensers },
    dashboard: { screen: Dashboard },
    main: { screen: Main },
},
    {
        initialRouteName: 'login'
    }
);

export default createAppContainer(AppNavigator);