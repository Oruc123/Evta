import { createStackNavigator } from 'react-navigation-stack';

import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import ForgetPsw from '../../pages/ForgetPsw';

import OpenInfo from '../../containers/auth/OpenInfo';
import SequenceInfo from '../basic/SequenceInfo';

const AuthStack = createStackNavigator({
    OpenInfo: { screen: OpenInfo },
    Login: { screen: Login },
    Signup: { screen: Signup },
    ForgetPsw: { screen: ForgetPsw },
    SequenceInfo: { screen: SequenceInfo }
}, { headerMode: 'none' });

export default AuthStack;
