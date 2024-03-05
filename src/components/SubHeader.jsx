import React, { useState } from 'react'
import { Box,TextField, FormLabel, IconButton } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import  {useSelector,useDispatch} from 'react-redux'
import {searchProduct} from '../redux/features/filterItem/searchItemSlice'
import { searchDate } from '../redux/features/filterItem/searchItemSlice';
function SubHeader() {
  
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.search.searchTerm)
    const handleInputChange = (event) =>{
        dispatch(searchProduct(event.target.value))
        
    }
   
  return (
    <Box sx={{margin:3,display:'flex',justifyContent:'space-between'}}>
        <Box sx={{display:'flex',justifyContent:'space-around'}}>
            <Box sx={{marginRight:5}} >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{display:'flex',flexDirection:'column'}}>
                <FormLabel>Baslama Tarixi</FormLabel>
              <DatePicker onChange={(newValue)=>{dispatch(searchDate(newValue.toISOString()))}} />
                </Box>
              </LocalizationProvider>
            </Box>
            <Box>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{display:'flex',flexDirection:'column'}}>

             <FormLabel>Bitis Tarixi</FormLabel>
             <DatePicker />
                </Box>
             </LocalizationProvider>
            </Box>
        </Box>
        <Box sx={{marginTop:3}}>
        <TextField 
        id="outlined-basic"
        label="Axtar" 
        variant="outlined"
        onChange={handleInputChange}
       />
       <IconButton sx={{border:'1px solid gray',borderRadius:0,padding:'15px'}}>
        <SearchIcon/>
       </IconButton>
        </Box>
    </Box>
    
  )
}

export default SubHeader
