import Product from '../../models/products';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        //any async code you want!
        const userId = getState().auth.userId;
        try {
            const response  = await fetch('https://shop-app-efd07.firebaseio.com/products.json' 
            );

            if (!response.ok) {
                throw new Error('Something is wrong!');
            }

            const resData = await response.json();
            const loadedProducts = [];
    
            for (const key in resData) {
                loadedProducts.push(new Product(
                    key, 
                    resData[key].ownerId, 
                    resData[key].title, 
                    resData[key].imageUrl, 
                    resData[key].description, 
                    resData[key].price
                )
              );
    
            };
        dispatch({ 
                type: SET_PRODUCTS, 
                products: loadedProducts, 
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            });
        } catch (err) {
            //send to custom analytic server
            throw err;
        }
      
    };
};

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://shop-app-efd07.firebaseio.com/products/${productId}.json?auth=${token}`, 
            {
                method: 'DELETE'
            },
        );
        
        if(!response.ok) {
            throw new Error('Something is wrong!')
        }

        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        });
    }
};

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        //any async code you want!
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response  = await fetch(`https://shop-app-efd07.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description,
                imageUrl,   
                price, 
                ownerId: userId
            })
        });

        const resData = await response.json();

        dispatch({
                type: CREATE_PRODUCT,
                productData: {
                    title,
                    description,
                    imageUrl,
                    price,
                    ownerI: userId
                }
            });
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://shop-app-efd07.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description,
                imageUrl,   
            })
        });

        if(!response.ok) {
            throw new Error('Something is wrong!')
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                description,
                imageUrl
            }
        });
    }
};