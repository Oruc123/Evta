import { createStackNavigator } from 'react-navigation-stack';

import Home from '../../pages/Home';
import Lesson from '../../pages/Lesson';
import LessonDetail from '../../pages/LessonDetail';
import Section from '../../pages/Section';
import PreviewSection from '../../pages/PreviewSection';
import SectionDetail from '../../pages/SectionDetail';
import Course from '../../pages/Course';
import Rank from '../../pages/Rank';
import Account from '../../pages/Account';
import Settings from '../../pages/Settings';
import AccountEdit from '../../pages/AccountEdit';
import ChangePsw from '../../pages/ChangePsw';
import CreateProfile from '../../pages/CreateProfile';
import Balance from '../../pages/Balance';

import VideoPlayer from '../theme/VideoPlayer';
import SuccessInfo from '../basic/SuccessInfo';

const AppStack = createStackNavigator({
    Home: { screen: Home },
    Lesson: { screen: Lesson },
    LessonDetail: { screen: LessonDetail },
    Section: { screen: Section },
    PreviewSection: {screen: PreviewSection},
    SectionDetail: { screen: SectionDetail },
    Course: { screen: Course },
    Rank: { screen: Rank },
    Account: { screen: Account },
    Settings: { screen: Settings },
    AccountEdit: { screen: AccountEdit },
    ChangePsw: { screen: ChangePsw },
    CreateProfile: { screen: CreateProfile },
    Balance: { screen: Balance },
    VideoPlayer: { screen: VideoPlayer },
    SuccessInfo: { screen: SuccessInfo }
}, { headerMode: 'none' });

export default AppStack;
