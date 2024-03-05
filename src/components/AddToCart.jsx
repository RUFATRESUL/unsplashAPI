import React, { useState } from 'react'
import {Box,Typography,Drawer,Stack,IconButton,Container } from '@mui/material'
import { BsCartX } from "react-icons/bs";
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch,useSelector } from 'react-redux';
import { removeProduct } from '../redux/features/product/productSlice';
import RenderIf from '../components/RenderIf'

function AddToCart() {
  const [clearCart, setClearCart] = useState(false)
    const closeCartPage = () =>{
      setClearCart(false)
    }
    const dispatch = useDispatch();
    
    const {basket} = useSelector(state=>state.counter)

    console.log(basket,'length')
  return (
    <Box>
    <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:2,bgcolor:'green'}}>
        <IconButton  onClick={closeCartPage}><ClearIcon sx={{color:'white',fontSize:'30px'}}/></IconButton>
        <Stack> <Typography sx={{fontWeight:500,fontSize:'20px',color:'white'}}>My Cart</Typography></Stack>
        <Stack> <Typography sx={{fontWeight:600,fontSize:'13px',color:'white'}}> Items {basket?.length}</Typography></Stack>
    </Box>
    <Box sx={{height:'240px'}}>
        <Box sx={{display:'flex',justifyItems:'center',alignItems:'center',flexDirection:'column',marginTop:'130px'}}>
  <RenderIf condition={basket?.length} renderElse='no product'>
  {basket?.map((bask, index) => (
    <React.Fragment key={index}>
      <Container maxWidth='xl'>
        <Box sx={{display:'flex',justifyContent:'space-around',alignItems:'center',marginBottom:'10px',width:'100%',border:'1px solid gray',padding:'6px'}}>
              <img height={70} width={70} src={bask?.urls.full} alt="PHOTO" />
              <Typography sx={{fontSize:'20px'}}>{bask?.user?.name}</Typography>
              <IconButton onClick={() => dispatch(removeProduct(bask.id))} sx={{bgcolor:'red',fontSize:'15px',color:'white',borderRadius:'5px',height:'30px'}}>Delete</IconButton>
        </Box>
      </Container>
    </React.Fragment>
  ))}
</RenderIf>
        </Box>

    </Box>
    

</Box>
  )
}

export default AddToCart