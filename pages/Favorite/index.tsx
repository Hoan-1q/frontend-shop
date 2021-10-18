import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AppConstants, AppTheme, productType } from '../../config/DefaultConfig';
import { Dispatch } from 'redux';
import useTheme from "../../hooks/useTheme";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteComponentProps } from 'react-router-native';
import useConstants from '../../hooks/useConstants';
import useLanguage from '../../hooks/useLanguage';
import { AppLanguage } from '../../config/languages';
import { serverIP } from '../../store/api/users';
import ThemedText from '../../components/UI/ThemedText';
import FooterNavigation from '../Footer/Index';
import { Icon } from 'react-native-elements';
import { removeFavorite } from '../../store/reducers/config';
import { connect } from 'react-redux';

const ImagePath = require("../../images/nothing.png")

interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    history
}

const Favorite: React.FunctionComponent<Props> = ({
    dispatch,
    history
}: Props) => {
    const constants: AppConstants = useConstants();
    const theme: AppTheme = useTheme();
    const language: AppLanguage = useLanguage();
    const backButton = () => {
        history.push('/profile')
    }

    const onRemoveFavorite = (pro: any) => {
        dispatch(removeFavorite(pro))
    }

    return (
        <>
            <View style={[style.contentContainer, { borderColor: theme.lightTextColor }]}>
                {constants.favorite.length > 0 ? (
                    <ScrollView>
                        {constants.favorite.map((pro: productType) => (
                            <>
                                <View style={style.container}>
                                    <View style={[style.childContainer, style.leftContainer]}>
                                        <Image source={{ uri: `${serverIP}/${pro.avatar}` }} style={{ borderRadius: 10, width: 50, height: 50 }} />
                                    </View>
                                    <View style={[style.childContainer, style.leftContainer]}>
                                        <ThemedText styleKey="textColor" style={style.content}>{pro.title}</ThemedText>
                                        <ThemedText styleKey="textColor" style={style.price}>{`${pro.price}VND`}</ThemedText>
                                    </View>
                                    <View style={[style.childContainer, style.leftContainer]}>
                                        <Icon name="delete" size={30} onPress={() => onRemoveFavorite(pro)} color={theme.lightTextColor} />
                                    </View>
                                </View>
                            </>

                        ))}
                    </ScrollView>
                ) : (
                    <View style={{ paddingTop: 50, left: -40}} >
                        <Image style={{ width: 500 , height: 500 }} source={ImagePath}  />
                    </View>
                )}
            </View>
            <FooterNavigation history={history} />
        </>
    );
};

export default connect(({ dispatch }) => ({ dispatch }))(Favorite);

interface Style {
    contentContainer: ViewStyle;
    container: ViewStyle;
    childContainer: ViewStyle;
    leftContainer: ViewStyle;
    rightContainer: ViewStyle;
    icon: ViewStyle;
    content: TextStyle;
    price: TextStyle;
    Null: TextStyle;
}

const style: Style = StyleSheet.create<Style>({
    contentContainer: {
        paddingTop: 30,
        paddingBottom: 10,
        borderBottomWidth: 1,
    },
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    childContainer: {
        flex: 1,
        justifyContent: "center",
    },
    leftContainer: {
        alignItems: "flex-start",
        flex: 0,
    },
    rightContainer: {
        alignItems: "flex-end",
        flex: 0,
    },
    icon: {
        paddingTop: 5,
    },
    content: {
        fontSize: 15,
    },
    price: {
        fontSize: 12,
        color: 'red'
    },
    Null: {
        fontSize: 30,
        color: 'red'
    },
});
