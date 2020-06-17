import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/product-actions';

const initialState = {
   items: {},
   totalAmounth: 0
};

export default (state= initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                //already have the item in the cart
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                );
            } else {
                updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice);
            }
            return {
                ...state,
                items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
                totalAmounth: state.totalAmounth + productPrice
            };
        case REMOVE_FROM_CART: 
            const selectedCartItem = state.items[action.pid];
            const currentQuantity = selectedCartItem.quantity;
            let updatedCartItems;
            if(currentQuantity > 1) {
                //need to reduce it, not erase it
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1, 
                    selectedCartItem.productPrice, 
                    selectedCartItem.productTitle, 
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCartItems = {...state.items, [action.pid] : updatedCartItem }
            } else {
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.pid];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmounth: state.totalAmounth - selectedCartItem.productPrice  
            };
        case ADD_ORDER: 
            return initialState;
        case DELETE_PRODUCT:
            if(!state.items[action.pid]) {
                return state;
            }
            const updateItems = {...state.items};
            const itemTotal = state.items[action.pid.sum];
            delete updateItems[action.pid]; 
            return {
                ...state,
                items: updateItems,
                totalAmounth: state.totalAmounth - itemTotal
            };
    }
    return state;   
};



