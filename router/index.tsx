import React from 'react';
import {ViewStyle, StyleSheet} from 'react-native';
import {NativeRouter, Route, Switch} from 'react-router-native';
import {connect} from 'react-redux';
import BackHandlerHOC from '../components/HOC/BackHandlerHOC';
import BaseHome from '../pages/BaseHome';
import BaseNext from '../pages/BaseNext';
import {ApplicationConfig} from '../config/DefaultConfig';
import ConfigContext from '../config/AppConfigProvider';
import ThemedView from '../components/UI/ThemedView';
import Login from '../pages/Login/Index';
import CreateAccount from '../pages/CreateAccount/Index';
import Home from '../pages/Home/Index';
import Shopping from '../pages/Shopping';
import ProductDetails from '../pages/Shopping/ProductDetails';
import Bag from '../pages/Bag';
import Payment from '../pages/Payment';
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';
import ProfileDetail from '../pages/Profile/profile-detail';
import Address from '../pages/Address';
import MyShop from '../pages/MyShop';
import AddProduct from '../pages/MyShop/addProduct'
import Favorite from '../pages/Favorite';
import MyOrder from '../pages/MyOrder';

interface Props {
  configReducer: ApplicationConfig;
}

const Router: React.FunctionComponent<Props> = ({configReducer}: Props) => {
  return (
    <ConfigContext.Provider value={configReducer}>
      <ThemedView style={style.container}>
        <NativeRouter>
          <BackHandlerHOC>
            <Switch>
              <Route exact path="/" component={BaseHome} />
              <Route exact path="/base/" component={BaseNext} />
              <Route exact path="/login/" component={Login} />
              <Route exact path="/createAccount/" component={CreateAccount} />
              <Route exact path="/home/" component={Home} />
              <Route exact path="/shopping/" component={Shopping} />
              <Route path="/productDetails/" component={ProductDetails} />
              <Route path="/myShop/" component={MyShop} />
              <Route path="/myOrders/" component={MyOrder} />
              <Route path="/addProduct/" component={AddProduct} />
              <Route path="/bag/" component={Bag} />
              <Route path="/Address/" component={Address} />
              <Route path="/payment/" component={Payment} />
              <Route path="/checkout/" component={Checkout} />
              <Route path="/profile/" component={Profile} />
              <Route path="/profileDetails/" component={ProfileDetail} />
              <Route path="/favorite/" component={Favorite} />
            </Switch>
          </BackHandlerHOC>
        </NativeRouter>
      </ThemedView>
    </ConfigContext.Provider>
  );
};

export default connect(({configReducer}) => ({configReducer}))(Router);

interface Style {
  container: ViewStyle;
}

const style: Style = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
});
