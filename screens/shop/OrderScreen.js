import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/orderItem';
import * as orderActions from '../../store/actions/orders';
import Color from '../../constants/Color';

const OrdersScreen = props => {
    const [ isLoading, setIsLoading ] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(orderActions.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Color.primary} />   
            </View>
        )
    }

    if(orders.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>No orders found, maybe start ordering some products?</Text>
            </View>
        )
    }

    return (
        <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={itemData =>(
                    <OrderItem
                        amount={itemData.item.totalAmounth} 
                        date={itemData.item.readableDate} 
                        items={itemData.item.items}
                    />
                )}
        />
    )
};

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu" 
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen;