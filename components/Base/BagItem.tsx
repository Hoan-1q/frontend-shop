import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
} from 'react-native';
import { Dispatch } from 'redux';
import useTheme from '../../hooks/useTheme';
import {AppTheme, AppConstants, CartType} from '../../config/DefaultConfig';
import ThemedText from '../UI/ThemedText';
import useConstants from '../../hooks/useConstants';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-native';
import { remoeCart } from '../../store/reducers/config';
import { serverIP } from '../../store/api/users';

interface Props {
  index: number,
  data: CartType
}

interface Props extends RouteComponentProps {
  dispatch: Dispatch,
  history
}

// @ts-ignore

const BagItem: React.FunctionComponent<Props> = ({data, index, dispatch}: Props) => {
  const constants: AppConstants = useConstants();
  const theme: AppTheme = useTheme();


  const onPressRemove = (data) => {
    dispatch(remoeCart(data));
  }
  const { id, title, price, quantity, avatar } = data;

  return (
    <>
      <View style={[style.container, {paddingTop: 20}]}>
        <View style={[style.childContainer, style.leftContainer]}>
          <Image source={{ uri: `${serverIP}/${avatar}`}} style={style.imageStyle} />
        </View>
        <View
          style={[
            style.childContainer,
            style.rightContainer,
            style.extraStyle,
            {justifyContent: 'flex-start'},
          ]}>
          <View style={[style.container, {paddingRight: 0}]}>
            <View
              style={[
                style.childContainer,
                style.leftContainer,
                style.extraStyle,
              ]}>
              <ThemedText styleKey="textColor" style={style.content}>
                {title}
              </ThemedText>
            </View>
            <View
              style={[style.childContainer, style.rightContainer, {flex: 1}]}>
              <TouchableOpacity>
                <MaterialIcon
                  name="trash-can-outline"
                  size={20}
                  color={theme.lightTextColor}
                  onPress={() => onPressRemove(data)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[style.container, {paddingTop: 20}]}>
            <View
              style={[style.childContainer, style.leftContainer, {flex: 1}]}>
              <ThemedText styleKey="lightTextColor" style={[style.content]}>
                Quantity
              </ThemedText>
            </View>
          </View>
          <View style={style.container}>
            <View
              style={[style.childContainer, style.leftContainer, {flex: 1}]}>
              <ThemedText
                styleKey="textColor"
                style={[style.content, {paddingLeft: 7}]}>
                {quantity}
              </ThemedText>
            </View>
          </View>
          {/* <View style={[style.container, {paddingTop: 20, paddingRight: 0}]}>
            <View
              style={[
                style.childContainer,
                style.rightContainer,
                style.extraStyle,
              ]}>
              <ThemedText styleKey="lightTextColor" style={[style.strike]}>
                $20.90
              </ThemedText>
            </View>
          </View> */}
          <View style={[style.container, {paddingRight: 0}]}>
            <View
              style={[
                style.childContainer,
                style.rightContainer,
                style.extraStyle,
              ]}>
              <ThemedText styleKey="textColor" style={style.content}>
                {`${price} VND`}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default connect(({ dispatch }) => ({ dispatch }))(BagItem);

interface Style {
  container: ViewStyle;
  childContainer: ViewStyle;
  leftContainer: ViewStyle;
  rightContainer: ViewStyle;
  title: TextStyle;
  content: TextStyle;
  strike: TextStyle;
  imageStyle: ImageStyle;
  extraStyle: ViewStyle;
}

const style: Style = StyleSheet.create<Style>({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  childContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  leftContainer: {
    alignItems: 'flex-start',
    flex: 0,
  },
  rightContainer: {
    alignItems: 'flex-end',
    flex: 0,
  },
  title: {
    fontSize: 25,
    paddingTop: 15,
  },
  content: {
    fontSize: 14,
  },
  strike: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  imageStyle: {
    width: 140,
    height: 140,
  },
  extraStyle: {
    flex: 3,
  },
});
