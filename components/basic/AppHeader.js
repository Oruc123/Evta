import React, { Component } from 'react';
import { URL } from '../../components/basic/url';
import showToast from '../../helper/ToastAlert';
import axios from 'axios';
import DefaultHeader from './header/DefaultHeader';
import AccountHeader from './header/AccountHeader';
import SettingsHeader from './header/SettingsHeader';
import ProfileHeader from './header/ProfileHeader';
import NavigationService from '../navigation/NavigationService';
var ls = require('react-native-local-storage');

export default class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            kid_name: '',
            profile_point: '',
            access_sequence: '',
            access_sequence_message: null,
            point_addition: null
        }
        if (typeof this.props.navigation !== 'undefined') {
            this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
                this.componentDidMount();
            });
        }
    }

    async componentDidMount() {

        let token = await ls.get('token');
        this.setState({ token: token });
        let account = await ls.get('account');
        let kid_id = await ls.get('kid_id');

        if (token !== null) {
            let jsonObj = {
                token: token,
                account: account,
                profile: kid_id
            }
            this.getProfileInfo(jsonObj);
        }

    }

    getProfileInfo = (jsonObj) => {
        axios.post(URL + "api/account/profile/info", jsonObj)
            .then(result => this.setState({
                kid_name: result.data.result.name,
                profile_point: result.data.result.profile_point,
                access_sequence: result.data.result.access_sequence,
                access_sequence_message: result.data.result.access_sequence_message,
                point_addition: result.data.result.point_addition
            })
            )
            .catch(error => showToast("İnternet bağlantısında problem yarandı. Zəhmət olmasa yenidən cəhd edin", "danger"));
    }

    render() {

        const { token, profile_point, kid_name, access_sequence, access_sequence_message, point_addition } = this.state;
        const { type, backTo, title } = this.props;

        if(typeof access_sequence_message != 'undefined' && access_sequence_message != null){
            NavigationService.navigate('SequenceInfo', { access_sequence: access_sequence_message, point_addition: point_addition });
        }

        if (token === '' || token === null) {
            return (
                <DefaultHeader />
            );
        } else if (type === 'account') {
            return (
                <AccountHeader />
            );
        } else if (type === 'settings') {
            return (
                <SettingsHeader backTo={backTo} title={title} />
            );
        } else {
            return (
                <ProfileHeader profile_point={profile_point} kid_name={kid_name} access_sequence={access_sequence} navigation={this.props.navigation} />
            );
        }
    }

}