import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { Header, Left, Body, Right, Icon, Button } from 'native-base';
import NavigationService from '../../../components/navigation/NavigationService';

const ForgetPswHeader = () => {

    return (
        <Header androidStatusBarColor="#f5f5f5" style={styles.header}>
            <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
            <Left></Left>
            <Body></Body>
            <TouchableWithoutFeedback onPress={() => NavigationService.navigate('Login')}>
                <Right>
                    <Button onPress={() => NavigationService.navigate('Login')} transparent>
                        <Icon name="close" style={styles.icon} />
                    </Button>
                </Right>
            </TouchableWithoutFeedback>
        </Header>
    );

}

const styles = StyleSheet.create({
    header: {
        marginTop: StatusBar.currentHeight,
        backgroundColor: 'transparent',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    icon: {
        fontSize: 30,
        color: '#E0436B'
    }
});
export default ForgetPswHeader;