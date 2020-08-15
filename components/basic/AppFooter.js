import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import NavigationService from '../../components/navigation/NavigationService';
var ls = require('react-native-local-storage');

export default class AppFooter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loggedin: false
        }
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {

        let token = await ls.get('token');

        if (token !== null) {
            this.setState({ is_loggedin: true });
        }

    }

    render() {

        const { is_loggedin } = this.state;

        return (
            <Footer>
                <FooterTab style={styles.footerBackground}>
                    <Button onPress={() => NavigationService.navigate('Home')}>
                        <Image source={require('../../assets/footer/logo.png')} />
                    </Button>
                    <Button onPress={() => is_loggedin ? NavigationService.navigate('Lesson') : NavigationService.navigate('OpenInfo')}>
                        <Image source={require('../../assets/footer/play.png')} />
                    </Button>
                    <Button onPress={() => is_loggedin ? NavigationService.navigate('Rank') : NavigationService.navigate('OpenInfo')}>
                        <Image source={require('../../assets/footer/rank.png')} />
                    </Button>
                    <Button onPress={() => is_loggedin ? NavigationService.navigate('Account') : NavigationService.navigate('OpenInfo')}>
                        <Image source={require('../../assets/footer/profile.png')} />
                    </Button>
                </FooterTab>
            </Footer>
        );
    }

}
const styles = StyleSheet.create({
    footerBackground: {
        backgroundColor: '#fff'
    }
});
