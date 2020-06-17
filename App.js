import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';

import productsReducer from './store/reducers/products-reducer';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
}

export default function App() {
  const [ fontLoaded, setFontLoaded ] = useState(false);

  if(!fontLoaded) {
      return (
        <AppLoading 
            startAsync={fetchFonts} 
            onFinish={() => setFontLoaded(true)}
        />
      )
  }

  return (
      <Provider store={store}>
          <ShopNavigator />
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
