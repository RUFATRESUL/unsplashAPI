import { createSlice } from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";

const initialState ={
    
        data:[],
        basket : []
}
export const productSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        countProductItem(state,action){
            state.data = action.payload
        },
        addProduct(state,action){
            state.basket.push(action.payload)
        },
        removeProduct (state,action){
               const filteredBasket = state.basket.filter(item => item.id !== action.payload);
               state.basket = filteredBasket; 
        },
        setProductFilter(state,action){
            state.basket= [...state.basket, action.payload]
        },
        clearPersist:()=>initialState,
    },
    
})
const persistConfig = {
    key: "MC:Products",
    storage,
    whitelist: ["basket"],
};

const reducer = persistReducer(
    persistConfig,
    productSlice.reducer
);

export default reducer
export const {addProduct,countProductItem,removeProduct,clearPersist,setProductFilter} = productSlice.actions