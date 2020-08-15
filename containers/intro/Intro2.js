import React from 'react';
import { StyleSheet, Image, ImageBackground } from 'react-native';
import { View, Text } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Intro2 = (props) => {

    return (
        <ImageBackground resizeMode="stretch" source={require('../../assets/intro/intro2_background.jpg')} style={styles.imageBackground} >
            <View style={{ flex: 1 }}>
                <Text style={styles.headText}>{props.text}</Text>
                <Image resizeMode="contain" style={styles.image} source={require('../../assets/intro/intro2.png')} />
            </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%'
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
export default Intro2;