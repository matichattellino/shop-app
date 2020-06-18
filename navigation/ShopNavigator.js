import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/StartUpScreen';
import Color from '../constants/Color';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary 
}

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons 
                    name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                    size={23}
                    color={drawerConfig.tintColor}                  
                />
            )
        },
        defaultNavigationOptions: defaultNavOptions
    },
    {
        defaultNavigationOptions: defaultNavOptions 

    }
);

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrdersScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons 
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} 
                    size={23}
                    color={drawerConfig.tintColor}                  
                />
            )
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductScreen,
        EditProduct: EditProductScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons 
                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                    size={23}
                    color={drawerConfig.tintColor}                  
                />
            )
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const shopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Color.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <SafeAreaView
                    forceInset={{top: 'always', horizontal: 'never'}}
                >
                    <DrawerItems {...props} />
                    <Button 
                        title="Logout" 
                        color={Color.primary} 
                        onPress={() => {
                            dispatch(authActions.logout());
                            //props.navigation.navigate('Auth');
                        }} 
                    />
                </SafeAreaView>
            </View>
        )
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const MainNavigator = createSwitchNavigator({
    StartUp: StartUpScreen,
    Auth: AuthNavigator,
    Shop: shopNavigator
});

export default createAppContainer(MainNavigator);
