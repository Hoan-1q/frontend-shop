import React from 'react';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-native';
import { AppTheme, AppConstants } from '../../config/DefaultConfig';
import useConstants from '../../hooks/useConstants';
import useTheme from "../../hooks/useTheme";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, ViewStyle, StyleSheet, TextStyle, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { AppLanguage } from '../../config/languages';
import useLanguage from '../../hooks/useLanguage';
import { connect } from 'react-redux';
import { setAddress } from '../../store/reducers/config';

interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    history
}

// @ts-ignore
const ImagePath = require("../../images/card.png")

const Address: React.FunctionComponent<Props> = ({
    dispatch,
    history
}: Props) => {
    const constants: AppConstants = useConstants();
    const theme: AppTheme = useTheme();
    const language: AppLanguage = useLanguage();

    const [addressValue, setAddressValue] = React.useState('');

    const backPress = () => {
        history.goBack();
    }

    const onChangeAddess = (value: string) => {
        setAddressValue(value);
        dispatch(setAddress(value))
    }

    return (
        <ScrollView style={style.mainContainer}>
            <View style={style.mainContainer}>
                <View style={style.contentContainer}>
                    <View style={[style.childContainer, style.leftContainer]}>
                        <TouchableOpacity onPress={backPress}>
                            <MaterialIcon name="arrow-left" size={30} color={theme.textColor} style={style.backIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={[style.childContainer, style.rightContainer, { flex: 5, marginLeft: 10 }]}>
                        <TextInput
                            style={[style.inputContainer, { borderBottomColor: theme.inputBorderColor, color: theme.textColor, paddingLeft: 5 }]}
                            placeholderTextColor={theme.lightTextColor}
                            placeholder="Address"
                            value={addressValue}
                            onChangeText={(value) => onChangeAddess(value)}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default connect(({ dispatch }) => ({ dispatch }))(Address);

interface Style {
    mainContainer: ViewStyle;
    contentContainer: ViewStyle;
    childContainer: ViewStyle;
    rightContainer: ViewStyle;
    inputContainer: TextStyle;
    backIcon: TextStyle;
    leftContainer: ViewStyle;
}

const style: Style = StyleSheet.create<Style>({
    mainContainer: {
        paddingTop: 30,
        padding: 10,
        margin: 0,
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 10,
    },
    childContainer: {
        flex: 1,
        justifyContent: "center",
    },
    leftContainer: {
        alignItems: "flex-start",
        flex: 0,
      },
    backIcon: {
        fontSize: 25,
        paddingTop: 20,
    },
    rightContainer: {
        alignItems: "flex-end",
        flex: 0,
    },
    inputContainer: {
        height: 40,
        width: "100%",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 2,
        fontSize: 14,
        paddingLeft: 20,
        paddingRight: 20,
    },
});
