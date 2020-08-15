import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation';
import { View } from 'native-base';
import Loading from '../../components/basic/Loading';
var ls = require('react-native-local-storage');

export default class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: false,
            account: false,
            profile: '',
            exercise: '',
            lang: '',
            preview: false
        }
        this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
            this.componentDidMount();
        });
    }

    async componentDidMount() {

        Orientation.lockToLandscape();

        let token = await ls.get('token');
        let account = await ls.get('account');
        let profile = await ls.get('kid_id');
        let exercise = this.props.navigation.getParam('id');
        let lang = this.props.navigation.getParam('lang');

        console.log(token);
        console.log(account);
        console.log(profile);
        console.log(exercise);
        console.log(lang);

        if (!account) {
            this.setState({ preview: true, exercise: exercise, lang: lang });
        } else {
            this.setState({ token: token, account: account, profile: profile, exercise: exercise, lang: lang });
        }

    }

    render() {
        let jsonObj = {};
        if (!this.state.preview && !this.state.token) {
            return <Loading />;
        }

        if (this.state.preview) {
            jsonObj = {
                exercise: this.state.exercise,
                lang: this.state.lang
            }
        } else {
            jsonObj = { ...this.state }
        }
        return (
            <View style={{ flex: 1 }}>
                <WebView source={{
                    uri: 'https://evta.az/api/course/video', method: 'POST', body: JSON.stringify(jsonObj)
                }} />
            </View>
        );
    }
}