import React from 'react';
import { RouteComponentProps } from 'react-router-native';
import { Dispatch } from 'redux';
import { View, ViewStyle, StyleSheet, TextStyle, TextInput, ImageBackground, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
import { AppTheme, AppConstants } from '../../config/DefaultConfig';
import ThemedText from '../../components/UI/ThemedText';
import useConstants from '../../hooks/useConstants';
import RoundButton from '../../components/Base/RoundButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';
import { AppLanguage } from '../../config/languages';
import useLanguage from '../../hooks/useLanguage';
import { Formik } from 'formik';
import { editProfile } from '../../store/api/users';
import { launchImageLibrary } from 'react-native-image-picker';
import { setUserAction } from '../../store/reducers/config';
import { connect } from 'react-redux';

interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    history
}

// @ts-ignore
const ProfileDetail: React.FunctionComponent<Props> = ({
    dispatch,
    history
}: Props) => {
    const constants: AppConstants = useConstants();
    const theme: AppTheme = useTheme();
    const language: AppLanguage = useLanguage();

    const [photo, setPhoto] = React.useState(null);

    const backButton = () => {
        history.push('/profile')
    }

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            // console.log(response);
            if (response) {
                setPhoto(response);
            }
        });
    };

    const submitButton = async (values: { name: string, password: string, email: string, address: string }) => {
        const { name, password, email, address } = values;
        const { phone, id, avatar } = constants.user;
        await editProfile(name, password, email, address, constants.user.id);
        dispatch(setUserAction({ name: name, password: password, phone: phone, id: id, avatar: avatar, address: address, email: email }))
        history.push('/profile')
    }

    const { avatar, email, name, password, address } = constants.user

    return (
        <>
            <TouchableOpacity onPress={backButton}>
                <MaterialIcon name="arrow-left" size={30} color={theme.textColor} style={style.backIcon} />
            </TouchableOpacity>
            <ScrollView style={style.mainContainer}>
                <Formik
                    initialValues={{ name: name, password: password, email: email, address: address }}
                    onSubmit={values => submitButton(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={style.container}>
                            <View style={[style.childContainer, style.leftContainer]}>
                                <Image source={{ uri: `http://192.168.1.2:3000/${avatar}` }} style={[style.imageStyle, { borderRadius: 10 }]} />
                            </View>
                            <View style={style.topContainer}>
                                <ThemedText styleKey="appColor" style={style.title}>Edit Profile</ThemedText>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {photo && (
                                    <>
                                        <Image
                                            source={{ uri: photo }}
                                            style={{ width: 50, height: 50 }}
                                        />
                                        <Button title="Upload Photo" onPress={() => { }} />
                                    </>
                                )}
                                <Button title="Choose Photo" onPress={handleChoosePhoto} />
                            </View>
                            <View style={style.childContainer}>
                                <ThemedText style={style.inputLabel} styleKey="inputColor">{language.labelName}</ThemedText>
                            </View>
                            <View style={style.childContainer}>
                                <TextInput
                                    style={[style.inputContainer, { borderBottomColor: theme.inputBorderColor, color: theme.textColor }]}
                                    placeholderTextColor={theme.lightTextColor}
                                    placeholder={language.namePlaceholder}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    defaultValue={name}
                                />
                            </View>
                            <View style={style.childContainer}>
                                <ThemedText style={style.inputLabel} styleKey="inputColor">{language.labelEmail}</ThemedText>
                            </View>
                            <View style={style.childContainer}>
                                <TextInput
                                    style={[style.inputContainer, { borderBottomColor: theme.inputBorderColor, color: theme.textColor }]}
                                    placeholderTextColor={theme.lightTextColor}
                                    placeholder={language.labelEmail}
                                    value={values.email}
                                    defaultValue={email}
                                    onBlur={handleBlur('email')}
                                    onChangeText={handleChange('email')}
                                />
                            </View>
                            <View style={style.childContainer}>
                                <ThemedText style={style.inputLabel} styleKey="inputColor">{language.labelAddress}</ThemedText>
                            </View>
                            <View style={style.childContainer}>
                                <TextInput
                                    style={[style.inputContainer, { borderBottomColor: theme.inputBorderColor, color: theme.textColor }]}
                                    placeholderTextColor={theme.lightTextColor}
                                    placeholder={language.labelAddress}
                                    value={values.address}
                                    onBlur={handleBlur('address')}
                                    onChangeText={handleChange('address')}
                                />
                            </View>
                            <View style={style.childContainer}>
                                <ThemedText style={style.inputLabel} styleKey="inputColor">{language.labelPass}</ThemedText>
                            </View>
                            <View style={style.childContainer}>
                                <TextInput
                                    style={[style.inputContainer, { borderBottomColor: theme.inputBorderColor, color: theme.textColor }]}
                                    placeholderTextColor={theme.lightTextColor}
                                    placeholder={language.passPlaceholder}
                                    secureTextEntry={true}
                                    value={values.password}
                                    onBlur={handleBlur('password')}
                                    onChangeText={handleChange('password')}
                                />
                            </View>
                            {/* <View style={style.childContainer}>
                                <ThemedText style={style.forgotPassword} styleKey="textColor" onPress={goToLogin}>{language.labelCheckAcc}</ThemedText>
                            </View> */}
                            <RoundButton label={language.labelSubmit} buttonStyle={{ minWidth: 230 }} onPress={handleSubmit} />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </>
    )
};

export default connect(({ dispatch }) => ({ dispatch }))(ProfileDetail);

interface Style {
    mainContainer: ViewStyle,
    container: ViewStyle;
    topContainer: ViewStyle;
    childContainer: ViewStyle;
    bottomContainer: ViewStyle;
    inputContainer: TextStyle;
    inputLabel: TextStyle;
    forgotPassword: TextStyle;
    title: TextStyle;
    Icon: TextStyle;
    leftContainer: ViewStyle;
    iconContainer: ViewStyle;
    containerBg: ViewStyle;
    containerImage: ViewStyle;
    backIcon: ViewStyle;
    imageStyle: imageStyle;
}

const style: Style = StyleSheet.create<Style>({
    mainContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    leftContainer: {
        alignItems: "flex-start",
        flex: 0,
    },
    imageStyle :{
        width: 100,
        height: 100,
      },
    container: {
        flex: 1,
        paddingLeft: 35,
        paddingRight: 35,
        fontSize: 16,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 50,
        marginBottom: 40,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 30,
    },
    inputLabel: {
        width: "100%",
        fontSize: 13
    },
    childContainer: {
        flexDirection: 'row',
        justifyContent: "center",
    },
    forgotPassword: {
        marginTop: 30,
        marginBottom: 15,
        fontSize: 16,
    },
    inputContainer: {
        height: 40,
        marginTop: 10,
        width: "100%",
        marginBottom: 10,
        borderBottomWidth: 2,
        fontSize: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "600",
    },
    iconContainer: {
        borderRadius: 6,
        margin: 12,
        minWidth: 50,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
    },
    Icon: {
        fontSize: 25,
        padding: 15,
        justifyContent: "center",
    },
    backIcon: {
        fontSize: 25,
        paddingTop: 20,
        paddingLeft: 25,
    }
});
