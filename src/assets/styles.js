import { StyleSheet } from 'react-native';
import { THEME_COLOR } from '@assets/colors';

var styles = StyleSheet.create({

    /*=================================================
                Form - CSS Styles
    ==================================================*/
    
    contentPadding: {
        paddingHorizontal: 26,
    },
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
    roundedItem: {
        marginBottom: 20,
        borderRadius: 5,
        borderColor: 'transparent',
        backgroundColor: '#f1f2f2',
    },
    roundedTextArea: {
        marginBottom: 20,
        borderRadius: 5,
        borderColor: 'transparent',
        backgroundColor: '#f1f2f2',
        fontSize: 17,
    },
    roundedBtn: {
        alignSelf: 'center',
        backgroundColor: THEME_COLOR,
        paddingHorizontal: 18,
    },
    bmContainer: {
        marginTop: 85,
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
