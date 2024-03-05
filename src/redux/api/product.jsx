import axios from 'axios'
const SearchProduct = async(term)=>{
    const response = await axios.get("https://api.unsplash.com/search/photos",{
        headers:{
            Authorization:"Client-ID hQN8CaXnHVE_8dXlouKwY0p6uukVylafAS0uJed86R0"
        },
        params:{
            query:term,
           
        },
    })
    return response.data.results
}

export default SearchProduct