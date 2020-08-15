import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';

const Preview = (props) => {

    return (
        <TouchableWithoutFeedback>
            <Card style={styles.card}>
                <CardItem cardBody>
                    {(typeof props.course_info.image !== 'undefined') ?
                        (<ImageBackground style={styles.itemImage} source={{ uri: props.course_info.image[props.lang] }}>
                        </ImageBackground>)
                        : (<View></View>)}
                </CardItem>
                <CardItem style={styles.cardItem}>
                    <Body>
                        {(typeof props.course_info.class !== 'undefined') ?
                            (<Text style={[styles.text, { fontSize: RFValue(15) }]}>{props.course_info.class[props.lang]}</Text>)
                            : (<Text></Text>)}
                        {(typeof props.course_info.title !== 'undefined') ?
                            (<Text style={styles.title}>{props.course_info.title[props.lang]}</Text>)
                            : (<Text></Text>)}
                        {(typeof props.course_info.description !== 'undefined') ?
                            (<Text style={[styles.text, { fontSize: RFValue(10) }]} note>{props.course_info.description[props.lang]}</Text>)
                            : (<Text></Text>)}
                    </Body>
                </CardItem>
            </Card>
        </TouchableWithoutFeedback>
    );

}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#0083E8',
        borderRadius: 15,
        overflow: 'hidden',
        height: 280
    },
    itemImage: {
        flex: 1,
        width: null,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        color: '#0083E8',
        fontSize: 30
    },
    cardItem: {
        padding: 20,
        backgroundColor: '#0083E8'
    },
    text: {
        color: '#fff'
    },
    title: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10
    }
});
export default Preview;