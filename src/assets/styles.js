import { StyleSheet } from 'react-native';
import { THEME_COLOR, BG_COLOR } from '@assets/colors';

// const borderColor = '#dfe1e5'
const borderColor = '#ccc'

var styles = StyleSheet.create({

    /*=================================================
                Headerbar Title Styles
    ==================================================*/

    headerTitleStyle: { 
        // fontWeight: '800', 
        color: 'rgb(40, 40, 40)',
    },

    /*=================================================
                Login/Signup Form Styles
    ==================================================*/
    
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
    bigText: {
        fontWeight: '700',
        fontSize: 24,
        paddingBottom: 14,
        color: 'rgb(41, 41, 54)',
    },
    smText: {
        fontWeight: '500',
        fontSize: 17,
        lineHeight: 24,
    },
    roundedItem: {
        marginBottom: 20,
        borderRadius: 5,
        borderColor: 'transparent',
        backgroundColor: '#f1f2f2',
        // backgroundColor: 'rgb(244,244,250)',
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
        paddingHorizontal: 24,
        height: 55,
        borderRadius: 50,
        shadowOffset: { width: 0, height: 2, },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        justifyContent: 'center'
    },
    roundedBtnDisabled: {
        backgroundColor: 'rgba(0,0,0,.12)'
    },
    roundedBtnSecondary: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 24,
        height: 55,
        borderRadius: 50,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgb(210, 210, 223)',
    },
    roundedDeleteBtn: {
        alignSelf: 'center',
        paddingHorizontal: 18,
    },
    bmContainer: {
        marginTop: 85,
        // backgroundColor: '#eff35e',
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 19,
        color: '#FFF',
    },
    buttonTextDisabled: {
        fontWeight: '700',
        fontSize: 19,
        color: 'rgba(0,0,0,.35)',
    },
    buttonTextSecondary: {
        fontWeight: '700',
        fontSize: 19,
        color: 'rgb(41, 41, 54)',
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

    /*=================================================
                Task Card Styles
    ==================================================*/
    
    card: { 
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        padding: 16,
    },
    cardHeaderText: {
        fontSize: 17,
        color: 'rgb(41, 41, 54)',
        fontWeight: '600',
        marginBottom: 6,
    },
    cardBodyText: {
        color: 'rgb(32, 33, 36)',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '400',
    },

    /*=================================================
                Task List Styles
    ==================================================*/

    taskListHeader: {
        backgroundColor: BG_COLOR,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 0.5,
        borderColor: '#c9c9c9',
    },
    taskListHeaderText: {
        fontSize: 13,
        color: '#595959',
        letterSpacing: 1.2,
        fontWeight: '500',    
    },
    listSeparator: {
        height: 0.5,
        backgroundColor: 'rgb(194,193,196)',
    },

    /*=================================================
                Request Card Styles
    ==================================================*/

    requestCard: {
        backgroundColor: "#fff",
        borderWidth: 0.5,
        borderColor: borderColor,
        borderRadius: 4,
        elevation: 3,
        marginVertical: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        // shadowOffset: { height: 2, width: 0 },
        // shadowOpacity: 0.1,
        // shadowRadius: 1.5,

        shadowOffset: { height: 1, width: 0 },
        shadowRadius: 1,
        shadowOpacity: 0.12,

        flex: 1,
    },
    requestCardBody: {
        paddingHorizontal: 16,
        paddingVertical: 18,
    },
    requestCardHeaderRow: { 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    requestCardFooterRow: {
        height: 48,
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderColor: borderColor,
    },
    requestCardFooterBtn: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    requestCardBtnSeparator: { 
        width: 0.5,
        backgroundColor: borderColor,
    },
    cardRating: {
        fontSize: 13,
        color: 'rgba(89, 89, 89, 0.5)',
    }

})

export default styles;
