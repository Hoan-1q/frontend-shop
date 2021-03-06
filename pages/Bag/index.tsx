import React from 'react';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-native';
import { AppTheme, AppConstants } from '../../config/DefaultConfig';
import useConstants from '../../hooks/useConstants';
import useTheme from "../../hooks/useTheme";
import { View, ViewStyle, StyleSheet, TextStyle, TouchableOpacity, ScrollView} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ThemedText from '../../components/UI/ThemedText';
import FooterNavigation from '../Footer/Index';
import BagItem from '../../components/Base/BagItem';
import BagOption from '../../components/Base/BagOption';
import { AppLanguage } from '../../config/languages';
import useLanguage from '../../hooks/useLanguage';
import { connect } from 'react-redux';

interface Props extends RouteComponentProps {
  dispatch: Dispatch,
  history
}

const Bag: React.FunctionComponent<Props> = ({
  dispatch,
  history
}: Props) => {
  const constants: AppConstants = useConstants();
  const theme: AppTheme = useTheme();
  const language: AppLanguage = useLanguage();

  const goToHome = () => {
    history.push('/home')
  }

  const goToCheckout = () => {
    history.push('/checkout')
  }

  React.useEffect(() => {
    console.log(constants.carts);
  })

  return (
    <View style={style.mainContainer}>
      <ScrollView>
        <View style={[style.contentContainer, {borderColor: theme.lightTextColor}]}>
          <View style={[style.container, {paddingBottom: 10, paddingLeft: 10}]}>
            <View style={[style.childContainer, style.leftContainer]}>
              <TouchableOpacity onPress={goToHome}>
                <MaterialIcon name="arrow-left" size={30} color={theme.textColor} style={style.backIcon} />
              </TouchableOpacity>
            </View>
            <View style={[style.childContainer, style.centerContainer]}>
              <ThemedText styleKey="textColor" style={style.title}>{language.labelBag}</ThemedText>
            </View>
          </View>
        </View>
        {constants.carts && constants.carts.map((product, index) => (
          <View>
            <BagItem data={product} index={index}/>
          </View>
        ))}
        {/* <BagOption label={language.labelDelivery} total="Standard - Free" /> */}
        <BagOption label={language.labelTotal} total={`${constants.carts.map((pro) => (pro.price*pro.quantity)).reduce((a, b) => (a + b),0)} VND`} />
        <View style={style.footerContainer}>
          <View style={[style.childContainer, style.centerContainer]}>
            <View style={[style.checkoutButton, {backgroundColor: theme.highlightColor}]}>
              <TouchableOpacity onPress={goToCheckout} disabled={constants.carts.length===0} >
                <ThemedText styleKey="highlightTextColor" style={style.checkoutStyle}>{language.shipLabel}</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <FooterNavigation history={history} />
    </View>
  );
};

export default connect(({ dispatch}) => ({ dispatch }))(Bag);

interface Style {
  mainContainer: ViewStyle;
  contentContainer: ViewStyle;
  container: ViewStyle;
  childContainer: ViewStyle;
  leftContainer: ViewStyle;
  centerContainer: ViewStyle;
  footerContainer: ViewStyle;
  checkoutButton: ViewStyle;
  backIcon: ViewStyle;
  title: TextStyle;
  checkoutStyle: TextStyle;
}

const style: Style = StyleSheet.create<Style>({
  mainContainer: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
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
  centerContainer: {
    alignItems: "center",
    flex: 8,
  },
  footerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 300
  },
  backIcon: {
    fontSize: 25,
    paddingTop: 20,
  },
  title: {
    fontSize: 25,
    paddingTop: 15,
  },
  checkoutButton: {
    borderRadius: 50,
    paddingLeft: 50,
    paddingRight: 50
  },
  checkoutStyle: {
    fontSize: 16,
    padding: 10,
  },
});
