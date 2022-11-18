import { StyleSheet } from "react-native";
import { Colors, Scaler, Size, Typo } from "../../styles";


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.COLOR_LIGHT_GRAY,
        minHeight: Scaler.scaleSize(42),
        borderRadius: 4,
        paddingHorizontal: Size.SIZE_14,
        alignItems: 'center'
    },

    containerFocus: {
        flexDirection: 'row',
        backgroundColor: Colors.COLOR_WHITE,
        minHeight: Scaler.scaleSize(42),
        borderRadius: 4,
        paddingHorizontal: Size.SIZE_14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.COLOR_ACCENT
    },


    eyeButton: {
        padding: Size.SIZE_8
    },

    input: {
        ...Typo.TextNormalRegular,
        color: Colors.COLOR_BLACK,
        flex: 1,
    },

    prefixContainer: {
        borderRightWidth: .5,
        borderRightColor: Colors.COLOR_DARK_GRAY,
        paddingRight: Scaler.scaleSize(8),
        marginRight: Scaler.scaleSize(4)
    },

    //Text

    textCaption: {
        ...Typo.TextSmallBold,
        color: Colors.COLOR_DARK_GRAY,
        marginBottom: Size.SIZE_12,
        alignSelf: 'flex-start'
    },

    textIDCode: {
        ...Typo.TextNormalRegular,
        marginLeft: Scaler.scaleSize(8)
    }
})

export default styles