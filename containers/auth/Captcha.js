import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Icon, Button } from 'native-base';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { URL } from '../../components/basic/url';
import axios from 'axios';

export default class Captcha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            image: ''
        }
        this.reRenderSomething = props.navigation.addListener('willFocus', () => {
            this.componentDidMount();
        });
    }

    componentDidMount() {
        this.getCaptcha();
    }

    getCaptcha = () => {
        axios.get(URL + "api/account/forgotten").then(result => this.setState({ token: result.data.result.token, image: result.data.result.image }))
    }

    render() {
        return (
            <View style={styles.captchaRowView}>
                <View style={styles.captchaView}>
                    <Image resizeMode="contain" style={styles.captcha} source={{ uri: this.state.image }} />
                </View>
                <View style={styles.resfreshView}>
                    <Button transparent onPress={() => this.getCaptcha()}>
                        <Icon name="md-refresh" style={styles.icon} />
                    </Button>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    captchaRowView: {
        flexDirection: 'row',
        marginTop: hp('3%')
    },
    captchaView: {
        flex: 1,
        marginLeft: 20
    },
    captcha: {
        flex: 1
    },
    resfreshView: {
        flex: 1,
        marginRight: 20,
        alignItems: 'flex-end'
    }
});