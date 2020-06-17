import React from 'react';
import { FlatList, Button, Platform, Alert, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Color from '../../constants/Color';
import * as productsActions from '../../store/actions/product-actions';

const UserProductsScreen = props => {
    const userProduct = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => {
        props.navigation.navigate('EditProduct', {productId: id});
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(productsActions.deleteProduct(id))
            }}
        ])
    };

    if(userProducts.length === 0) {
        return (
            <View>
                <Text>No product found, maybe start creating some?</Text>
            </View>
        )
    }

    return (
            <FlatList
                data={userProduct}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <ProductItem 
                        image={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {}}
                    >
                          <Button
                            color={Color.primary}
                            title="Edit"
                            onPress={() => {
                                editProductHandler(itemData.item.id);
                            }}
                        />
                        <Button
                            color={Color.primary}
                            title="Delete"
                            onPress={deleteHandler.bind(this, itemData.item.id)}
                            />
                    </ProductItem>
                )}
            />
    )
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
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
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Add" 
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                    onPress={() => {
                        navData.navigation.navigate('EditProduct');
                    }}
                />
            </HeaderButtons>
        )
    }
};

export default UserProductsScreen;