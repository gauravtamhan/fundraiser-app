import { StyleSheet } from 'react-native';
import { THEME_COLOR } from '@assets/colors';

var styles = StyleSheet.create({

    /*=================================================
                Login/Signup - CSS Styles
    ==================================================*/

    formContainer: {
        height: 700,
        paddingTop: 60,
        // backgroundColor: '#eff35e',
    },
    title: {
        fontWeight: '700',
        fontSize: 30,
        color: 'rgb(40, 40, 40)',
        alignSelf: 'center',
    },
    // subtitle: {
    //     fontWeight: '700',
    //     fontSize: 30,
    //     color: 'rgb(186, 192, 196)',
    // },
    item: {
        marginBottom: 20,
        marginLeft: 0
    },
    input: {
        paddingVertical: 12
    },
    bmContainer: {
        marginTop: 120,
        // backgroundColor: '#eff35e',
    },
    buttonText: {
        fontWeight: '500',
        color: '#FFF',
    },
    buttonTextTransparent: {
        fontWeight: '500',
        color: THEME_COLOR,
    },
    extra: {
        marginTop: 25,
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default styles;
