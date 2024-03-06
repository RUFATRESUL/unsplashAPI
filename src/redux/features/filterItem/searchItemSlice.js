import { createSlice, nanoid } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name:'search',
    initialState:{
        searchTerm:'',
        data:[],
        originalData:[]
    },
    reducers:{
        setProductItem(state,action){
            state.data = action.payload
            state.originalData = action.payload
        },
        addProduct(state,action){
            state.data.push({
                name:action.payload.first_name,
                // id:nanoid()
            })
        },
        searchProduct(state,action){
            if (state.searchTerm !== action.payload) {
                state.searchTerm = action.payload;
                state.data = state.originalData.filter((item)=>
                item.user.first_name.toLowerCase().includes(action.payload.toLowerCase()))
            }
          
        },
        searchDate(state,action){
            const date = state.originalData.filter((item)=>item.created_at.includes(action.payload))
            console.log(action.payload);
            state.data = date
            
        },
        removeProduct(state,action){
            const updateItem = state.data.filter((product)=>{
                return product.id !== action.payload
            })
            state.data = updateItem
        }
    }
})
export const {addProduct,searchProduct,removeProduct,setProductItem,searchDate} = itemSlice.actions
export default itemSlice.reducer