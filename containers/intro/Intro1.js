import React from 'react';
import { StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import { View, Text } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Intro1 = (props) => {

    return (
        <ImageBackground resizeMode="stretch" source={require('../../assets/intro/intro1_background.jpg')} style={styles.imageBackground}>
            <View style={{ flex: 1 }}>
                <Text style={styles.headText}>{props.text}</Text>
                <Image resizeMode="contain" style={styles.image} source={require('../../assets/intro/intro1.png')} />
            </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width
    },
    headText: {
        fontSize: RFValue(20),
        textAlign: "center",
        marginTop: hp('10%'),
        paddingLeft: 15,
        paddingRight: 15,
        color: '#0083E8'
    },
    image: {
        width: hp('50%'),
        height: hp('50%'),
        marginTop: hp('5%'),
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});
export default Intro1;