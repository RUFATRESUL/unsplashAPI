import React, { useEffect, useState } from 'react'
import { Card,CardActions,CardMedia,CardContent,Typography,Box,Container,FormControl,Select,MenuItem,InputLabel,FormLabel,Pagination,Grid } from '@mui/material'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import styled from 'styled-components';
import {useSelector,useDispatch} from 'react-redux'

import SearchProduct from '../redux/api/product';
import { setProductItem } from '../redux/features/filterItem/searchItemSlice';
import { countProductItem } from '../redux/features/product/productSlice';
import { addProduct,removeProduct } from '../redux/features/product/productSlice';
const CountProduct = styled.span`
font-size:30px;
font-weight:300;
margin:10px;
width:15px;
cursor:pointer;
`
const categories =[
    {
        id:1,
        name:"Ayyaqabi"
    },
    {
        id:2,
        name:"Koynek"
    },
    {
        id:3,
        name:"Papaq"
    }
]
function CardMenu() {
    const [age, setAge] = React.useState('')
    const [page, setPage] = useState(1)
    const {data} = useSelector(state=>state.search)
    const handleAddToCart =() =>{
        const productInfo = {
            first_name:"",
            urls:""
        }
        dispatch(addProduct(productInfo))
    }
    
    const dispatch = useDispatch()

    const handlePageSet = (event,value) =>{
        setPage(value);
    }
    const handleChange = (event) =>{
        setAge(event.target.value);
    }
    useEffect(() => {
      const fetchData = async () => {
        try{
            const results = await SearchProduct('your search term')
            dispatch(setProductItem(results))
            dispatch(countProductItem(results))
 
        }catch(error){
            console.log("Error fetching data" , error);
        }
      }
      fetchData()
    }, [])
    const startItemIndex = (page-1)*4;

    const totalPage = Math.ceil(data?.length / 4)

    const paginatedProducts = data?.slice(startItemIndex,startItemIndex+4)
    
  return (
    <>
    <Container maxWidth='xl'>
        <Box sx={{marginTop:10}}>
            <Grid container spacing={2}>
            {paginatedProducts.map((item,index)=>(
            <Grid item lg={3} key={index}>
                <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{height:140}} image={item.urls.full} alt={item.alt_description}/>
            <CardContent sx={{maxWidth:345}}>
        <Typography gutterBottom variant="h5" component="div">
          {item.user.first_name}
        </Typography>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          >
          {categories.map((categorieItem)=>{
          <MenuItem  key={categorieItem.id} value={categorieItem.name}>
            {categorieItem.name}
            </MenuItem>
        })}
        </Select>
        </FormControl>
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:2}}>
            <Box>
            <FormLabel>Created Date</FormLabel>
            <Typography>{new Date(item.created_at).toLocaleDateString()}</Typography>
            </Box>
            <Box>
            <FormLabel>Updated Date</FormLabel>
            <Typography>{new Date(item.updated_at).toLocaleDateString()}</Typography>
            </Box>
        </Box>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'15px'}} >
                <CountProduct onClick={()=>dispatch(removeProduct(item))}>-</CountProduct>
                <ShoppingBasketIcon sx={{bgcolor:'orange',padding:'7px',color:'white'}}/>
                <CountProduct onClick={()=>dispatch(addProduct(item))}>+</CountProduct>
            </Box>
                </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Box>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:10}}>
            <Pagination 
            count={totalPage}
            color='secondary'
            page={page}
            onChange={handlePageSet}
           />
        </Box>
    </Container>
    </>
  )
}

export default CardMenu