import {configureStore} from "@reduxjs/toolkit"
import movieSlice from "./Slice/MovieSlice"


export const store=configureStore({
    reducer:{
        movie:movieSlice,
    }
})