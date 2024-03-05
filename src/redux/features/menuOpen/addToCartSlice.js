import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open:false
}
export const sideMenuSlice = createSlice({
    name:"sideMenu",
    initialState,
    reducers:{
        setOpen:(state)=>{
            return {open:!state.open}
        }
    }

})
export default sideMenuSlice.reducer
export const{setOpen} = sideMenuSlice.actions