import React, { useState } from 'react'
import {Box,Typography,AppBar,Toolbar,IconButton,Stack,Drawer} from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Logo from '/public/Paomedia-Small-N-Flat-Shop.1024.png'

import AddToCart from './AddToCart';
import { useSelector,useDispatch} from 'react-redux';
import{setOpen } from '../redux/features/menuOpen/addToCartSlice'

function Header({openMenu}) {
  const dispatch = useDispatch()
  const {basket} = useSelector((state)=>state.counter)
  const open = useSelector(state=>state.menu.open)
  // const [isMenu, setIsMenu] = useState(false)
  const addToCartMenu = () =>{
    dispatch(setOpen())
  }
  const cartMenuClose = () =>{
    dispatch(setOpen(false))
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor:'green'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            >
                <Stack sx={{width:'30px'}}>
                <img src={Logo} alt="" />
                </Stack>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Amazon.com
          </Typography>
          <IconButton sx={{position:'relative'}} onClick={addToCartMenu}  >
            
            <ShoppingBasketIcon sx={{color:'white'}} />
            <Drawer
               anchor='right'
               open={open}
               onClose={cartMenuClose}
              //  onClick={()=>setOpenCard(false)}
               sx={{'& .MuiDrawer-paper': { boxSizing: 'border-box',width:'30%' }}}
               >
                <AddToCart openMenu={openMenu}/>
                
               </Drawer>
            <Stack sx={{
              position:'absolute',
              bottom:20,
              right:-5,
              backgroundColor:'white',
              color:'black',
              textAlign:'center',
              borderRadius:'50%',
              width:'15px',
              height:'20px',
              fontSize:'19px'


            }}>
              {basket?.length || 0}
              
            </Stack>
          </IconButton>
      
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header