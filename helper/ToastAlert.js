import { StatusBar } from 'react-native';
import { Toast } from 'native-base';
const showToast = (text, type) => {
    Toast.show({
        text: text,
        buttonText: "Bağla",
        type: type,
        duration: 3000,
        position: "top",
        style: {
            marginTop: StatusBar.currentHeight
        }
    });
}
export default showToast;