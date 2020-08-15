import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { Header, Left, Right, Body, Icon, Title } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import NavigationService from '../../../components/navigation/NavigationService';

const SettingsHeader = (props) => {

    return (
        <Header style={styles.header}>
            <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
            <TouchableWithoutFeedback onPress={() => NavigationService.navigate(props.backTo)}>
                <Left style={{ flex: 0.5 }}>
                    <TouchableWithoutFeedback onPress={() => NavigationService.navigate(props.backTo)}>
                        <Icon name='ios-arrow-back' size={25} style={styles.icon} />
                    </TouchableWithoutFeedback>
                </Left>
            </TouchableWithoutFeedback>
            <Body style={styles.headerBody}>
                <Title style={styles.title}>{props.title}</Title>
            </Body>
            <Right style={{ flex: 0.5 }}></Right>
        </Header>
    );

}
const styles = StyleSheet.create({
    header: {
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#fff'
    },
    icon: {
        color: '#8A8A8A',
        paddingLeft: 15
    },
    headerBody: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#333',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontWeight: '100',
        fontSize: RFValue(20)
    }
});
export default SettingsHeader;