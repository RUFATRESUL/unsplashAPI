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
            console.log(action.payload);
            const productIndex = state.basket.findIndex(item => item.id === action.payload.id);
            if(productIndex >= 0) {
                state.basket[productIndex].count++
               
            } else {
                state.basket.push({...action.payload ,count:1});
            }
        },
        removeProduct (state,action){
               const filteredBasket = state.basket.filter(item => item.id !== action.payload);
               state.basket = filteredBasket; 
        },
        decrementProduct(state,action){
            const decrIndex = state.basket.findIndex(item => item.id === action.payload);
                if (decrIndex !== -1) {
        
                if (state.basket[decrIndex].count === 1) {
           
            state.basket.splice(decrIndex, 1);
            } else {
      
            state.basket[decrIndex].count--;
        }
    }
        },
        incrementProduct(state,action){
            const incrIndex = state.basket.findIndex(item => item.id === action.payload);
                if(incrIndex === 0){
                    if(state.basket[incrIndex].count > 0){
                        state.basket[incrIndex].count++;
                    }else{
                        state.basket.push({id:action.payload,count:1})
                    }
                }
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
export const {addProduct,countProductItem,removeProduct,clearPersist,setProductFilter,decrementProduct,incrementProduct} = productSlice.actions