import React, { Component } from 'react';
import { StyleSheet, Image, View, Platform } from 'react-native';
import { Button } from 'native-base';
import { URL } from '../../components/basic/url';
import axios from 'axios';
import RNRestart from 'rn-restart';
import Carousel from 'react-native-snap-carousel';
import UserAvatar from 'react-native-user-avatar';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Loading from '../../components/basic/Loading';
import NavigationService from '../../components/navigation/NavigationService';
import showToast from '../../helper/ToastAlert';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
var ls = require('react-native-local-storage');

export default class AccountCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            account: null,
            kid_id: null,
            kid_image: '',
            kids: [],
            image_source: null
        }
        this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
            this.componentDidMount();
        });
    }

    async componentDidMount() {
        let token = await ls.get('token');
        let account = await ls.get('account');
        if (token === null) {
            NavigationService.navigate('OpenInfo');
        } else {
            let jsonObj = {
                token: token,
                account: account
            }
            let kid_id = await ls.get('kid_id');
            this.setState({ token: token, account: account, kid_id: kid_id });

            this.getProfileInfo(jsonObj);
        }
    }

    getProfileInfo = (jsonObj) => {
        axios.post(URL + "api/account/me", jsonObj)
            .then(result => this.setState({ kids: result.data.result.profile }))
            .catch(error => showToast("Sistem xətası", "danger"));
    }

    switchProfile = (id, lang) => {
        ls.save('kid_id', id);
        ls.save('kid_lang', lang);
        this.setState({ kid_id: id });
        RNRestart.Restart();
    }

    // selectPhotoTapped = () => {
    //     const options = {
    //         quality: 1.0,
    //         maxWidth: 500,
    //         maxHeight: 500,
    //         storageOptions: {
    //             skipBackup: true
    //         }
    //     };

    //     ImagePicker.showImagePicker(options, (response) => {

    //         if (response.didCancel) {
    //             //console.log('User cancelled photo picker');
    //         }
    //         else if (response.error) {
    //             //console.log('ImagePicker Error: ', response.error);
    //         }
    //         else if (response.customButton) {
    //             //console.log('User tapped custom button: ', response.customButton);
    //         }
    //         else {

    //             this.setState({
    //                 image_source: response.uri
    //             });

    //             let formData = new FormData();

    //             // formData.append('token', this.state.token);
    //             // formData.append('account', this.state.account);
    //             // formData.append('profile', this.state.kid_id);
    //             // formData.append('image', { name: 'image', filename: 'avatar.png', data: response.data });
    //             // console.log(formData);
    //             // fetch("http://10.251.82.8:8000/image_upload/", {
    //             //     method: 'post',
    //             //     body: formData
    //             // }).then(res => console.log(res))

    //             // formData.append('image', { name: 'image', filename: 'avatar.png', data: response.data });
    //             // let formData = new FormData();
    //             // formData.append('image', { uri: response.uri, name: response.fileName, type: response.type });
    //             // let config = {
    //             //     headers: {
    //             //         'Content-Type': 'multipart/form-data'
    //             //     }
    //             // }
    //             // axios({
    //             //     url: "https://itedu.az/json/image/",
    //             //     method: 'POST',
    //             //     data: formData,
    //             //     withCredentials: true,
    //             //     config
    //             // })
    //             //     .then(result => console.log(result))
    //             //     .catch(error => console.log(error))
    //             // console.log(this.state.token);
    //             // console.log(this.state.account);
    //             // console.log(this.state.kid_id);
    //             RNFetchBlob.fetch('POST', 'http://10.251.82.8:8000/image_upload/', {
    //                 'Content-Type': 'multipart/form-data',
    //             }, [
    //                 { name: 'image', filename: 'avatar.png', data: RNFetchBlob.wrap(response.uri) },
    //                 { name: 'token', data: this.state.token },
    //                 { name: 'account', data: this.state.account },
    //                 { name: 'profile', data: this.state.kid_id }
    //             ]).then((resp) => {
    //                 console.log("resp: ", resp);
    //             }).catch((err) => {
    //                 console.log("err: ", err);
    //             })
    //         }
    //     });
    // }

    _renderItem = ({ item, index }) => {
        if (item.image === null && this.state.kid_id === item.id) {
            source = item.name;
        } else if (item.image === null && this.state.kid_id !== item.id) {
            source = item.name;
        } else {
            source = item.image;
        }

        return (

            (this.state.kid_id === item.id) ?
                (
                    (this.state.image_source === null) ?
                        (
                            <Button style={styles.thumbnail} transparent>
                                <UserAvatar size="100" color="#E0436B" name={source} />
                            </Button>
                        ) :
                        (
                            <Button style={styles.thumbnail} transparent>
                                <Image style={styles.image} source={{ uri: this.state.image_source }} />
                            </Button>
                        )
                ) :
                (
                    <Button style={styles.thumbnail} transparent onPress={() => this.switchProfile(item.id, item.fk_lang)}>
                        <UserAvatar size="100" color="#C4C4C4" name={source} />
                    </Button>
                )

        );

    }

    render() {

        const { kids, kid_id } = this.state;

        if (kids.length === 0) {
            return (<Loading />);
        }

        return (
            <View>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    extraData={this.state}
                    data={kids.sort((a, b) => (kid_id === b.id) ? 1 : -1)}
                    renderItem={this._renderItem}
                    sliderWidth={wp('80%')}
                    itemWidth={150}
                />
            </View>
        );
    }

}
const styles = StyleSheet.create({
    thumbnail: {
        marginTop: 40,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2
    }
});