import React from 'react';
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import useTheme from "../../hooks/useTheme";
import { AppTheme } from "../../config/DefaultConfig";
import ThemedText from '../UI/ThemedText';

interface Props {
    label: string;
    onPress?: (event: GestureResponderEvent) => void,
    buttonStyle?: any,
    labelStyle?: any,
    disable?:boolean,
};

const RoundButton: React.FunctionComponent<Props> = ({
    onPress,
    label,
    buttonStyle,
    labelStyle,
    disable,
}: Props) => {
    const theme: AppTheme = useTheme();

    return (
        <TouchableOpacity onPress={onPress} disabled={disable}>
            <View style={[style.container, { shadowColor: theme.labelBgColor, backgroundColor: theme.appColor, borderColor: theme.lightBottomColor }, buttonStyle]}>
                <ThemedText styleKey="highlightTextColor" style={[style.userNameStyle, labelStyle]}>{label}</ThemedText>
            </View>
        </TouchableOpacity>
    );
};

export default RoundButton;

interface Style {
    container: ViewStyle;
    userNameStyle: TextStyle;
}

const style: Style = StyleSheet.create<Style>({
    container: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: "center",
        borderRadius: 45,
        borderWidth: 1,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        elevation: 6,
        minWidth: 30,
        height: 50,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    userNameStyle: {
        fontWeight: "bold",
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 16,
    }
})
