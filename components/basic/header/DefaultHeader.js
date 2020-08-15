import React from 'react';
import { StyleSheet, Image, StatusBar } from 'react-native';
import { Header, Left, Right, Icon, Button, Text } from 'native-base';
import NavigationService from '../../../components/navigation/NavigationService';

const DefaultHeader = () => {

    return (
        <Header style={styles.header}>
            <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
            <Left style={{ flex: 1 }}>
                <Image source={require('../../../assets/header/evta.png')} style={styles.logo} />
            </Left>
            <Right style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <Button iconRight transparent onPress={() => NavigationService.navigate('OpenInfo')}>
                    <Text style={styles.loginText} uppercase={false}>Daxil ol </Text>
                    <Icon name='md-person' size={25} style={styles.icon} />
                </Button>
            </Right>
        </Header>
    );

}
const styles = StyleSheet.create({
    header: {
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#fff'
    },
    headerBody: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginTop: 7,
        marginLeft: 10,
        width: 90,
        height: 25
    },
    loginText: {
        color: '#333'
    },
    icon: {
        color: '#E0436B',
        paddingRight: 15
    }
});
export default DefaultHeader;