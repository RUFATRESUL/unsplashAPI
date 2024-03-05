
import productReducer from '../redux/features/product/productSlice'
import searchReducer from '../redux/features/filterItem/searchItemSlice'
import menuReducer from '../redux/features/menuOpen/addToCartSlice'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = {
        counter:productReducer,
        search:searchReducer,
        menu:menuReducer,   
 
}
  export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
}
  )
  export const persistor = persistStore(store)
   