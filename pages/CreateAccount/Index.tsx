import React from 'react';
import { RouteComponentProps } from 'react-router-native';
import { Dispatch } from 'redux';
import { View, ViewStyle, StyleSheet, TextStyle, TextInput, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { AppTheme, AppConstants } from '../../config/DefaultConfig';
import ThemedText from '../../components/UI/ThemedText';
import useConstants from '../../hooks/useConstants';
import RoundButton from '../../components/Base/RoundButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';
import { AppLanguage } from '../../config/languages';
import useLanguage from '../../hooks/useLanguage';
import { Formik } from 'formik';
import { register } from '../../store/api/users';

interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    history
  }

// @ts-ignore
const ImagePath = require("../../images/Recraftsoppify_aap_bg_effect.png")

const CreateAccount: React.FunctionComponent<Props> = ({
    history
}: Props) => {
  const constants: AppConstants = useConstants();
  const theme: AppTheme = useTheme();
  const language: AppLanguage = useLanguage();

  const goToLogin = () => {
    history.push('/login')
  }

  const backButton = () => {
    history.push('/')
  }

  const submitButton = async (values: {name: string, username: string, password: string,phone: string, email: string}) => {
    const { name, username, password, phone, email } = values
    const res = await register(name, username, password, phone, email);
    switch (res.statusText) {
      case 'account already in use':
        alert('Tài khoản của bạn đã tồn tại vui lòng thử lại')
        break;
  
      case 'error':
        alert('xảy ra lỗi vui lòng thử lại')
        break;
      
      default:
        history.push('/')
        break;
    }
    // if (res.statusText === 'done') {
    //   history.push('/')
    // }
    // if (res.statusText === 'account already in use') {
    //   alert('Tài khoản của bạn đã tồn tại vui lòng thử lại')
    // }
  }

  return (
    <ImageBackground source={ImagePath} style={{ width: '100%', height: '100%' }} >
        <TouchableOpacity onPress={backButton}>
          <MaterialIcon name="arrow-left" size={30} color={theme.textColor} style={style.backIcon}/>
        </TouchableOpacity>
      <ScrollView style={style.mainContainer}>
      <Formik
          initialValues={{ name: '', username: '', password: '', phone: '', email: ''}}
          onSubmit={values => submitButton(values) }
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={style.container}>
        <View style={style.topContainer}>
          <ThemedText styleKey="appColor" style={style.title}>{language.createAccountLabel}</ThemedText>
        </View>
        <View style={style.childContainer}>
          <ThemedText style={style.inputLabel} styleKey="inputColor">{language.labelName}</ThemedText>
        </View>
        <View style={style.childContainer}>
          <TextInput
            style={[style.inputContainer, {borderBottomColor: theme.inputBorderColor, color: theme.textColor}]}
            placeholderTextColor={theme.lightTextColor}
            placeholder={language.namePlaceholder}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
        </View>
        <View style={style.childContainer}>
          <ThemedText style={style.inputLabel} styleKey="inputColor">{language.labelUser}</ThemedText>
        </View>
        <View style={style.childContainer}>
          <TextInput
            style={[style.inputContainer, {borderBottomColor: theme.inputBorderColor, color: theme.textColor}]}
            placeholderTextColor={theme.lightTextColor}
            placeholder={language.labelUser}
            value={values.username}
            onBlur={handleBlur('username')}
            onChangeText={handleChange('username')}
          />
        </View>
        <View style={style.childContainer}>
          <ThemedText style={style.inputLabel} styleKey="inputColor">{language.labelEmail}</ThemedText>
        </View>
        <View style={style.childContainer}>
          <TextInput
            style={[style.inputContainer, {borderBottomColor: theme.inputBorderColor, color: theme.textColor}]}
            placeholderTextColor={theme.lightTextColor}
            placeholder={language.emailPlaceholder}
            value={values.email}
            onBlur={handleBlur('email')}
            onChangeText={handleChange('email')}
          />
        </View>
        <View style={style.childContainer}>
          <ThemedText style={style.inputLabel} styleKey="inputColor">{language.labelPass}</ThemedText>
        </View>
        <View style={style.childContainer}>
          <TextInput
            style={[style.inputContainer, {borderBottomColor: theme.inputBorderColor, color: theme.textColor}]}
            placeholderTextColor={theme.lightTextColor}
            placeholder={language.passPlaceholder}
            secureTextEntry={true}
            value={values.password}
            onBlur={handleBlur('password')}
            onChangeText={handleChange('password')}
          />
        </View>
        <View style={style.childContainer}>
          <ThemedText style={style.inputLabel} styleKey="inputColor">{language.labelPhone}</ThemedText>
        </View>
        <View style={style.childContainer}>
          <TextInput
            style={[style.inputContainer, {borderBottomColor: theme.inputBorderColor, color: theme.textColor}]}
            placeholderTextColor={theme.lightTextColor}
            placeholder={language.phonePlaceholder}
            value={values.phone}
            onBlur={handleBlur('phone')}
            onChangeText={handleChange('phone')}
          />
        </View>
        <View style={style.childContainer}>
          <ThemedText style={style.forgotPassword} styleKey="textColor" onPress={goToLogin}>{language.labelCheckAcc}</ThemedText>
        </View>
        <RoundButton label={language.labelSubmit} buttonStyle={{minWidth: 230}} onPress={handleSubmit} />
        <View style={style.childContainer}>
          <ThemedText style={style.forgotPassword} styleKey="textColor">{language.labelChoice}</ThemedText>
        </View>
        <View style={style.childContainer}>
          <View style={[style.iconContainer, { shadowColor: theme.labelBgColor, backgroundColor: theme.googleColor }]}>
            <Icon name="google" size={30} color={theme.highlightTextColor} style={style.Icon} onPress={()=> {alert("google")}}/>
          </View>
          <View style={[style.iconContainer, { shadowColor: theme.labelBgColor, backgroundColor: theme.facebookColor }]}>
            <Icon name="facebook" size={30} color={theme.highlightTextColor} style={[style.Icon]} onPress={()=> {alert("facebook")}}/>
          </View>
        </View>
      </View>
      )}
      </Formik>
      </ScrollView>
    </ImageBackground>
  )
};

export default CreateAccount;

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
  iconContainer: ViewStyle;
  containerBg: ViewStyle;
  containerImage: ViewStyle;
  backIcon: ViewStyle;
}

const style: Style = StyleSheet.create<Style>({
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
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
