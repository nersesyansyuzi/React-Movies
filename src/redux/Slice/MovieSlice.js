import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPopularMovies = createAsyncThunk(
    "movie/fetchPopularMovies",
    async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d89ca1152ea0fd22221e943bf8085fd1`)
        const data = await response.json()
        return data.results
    }
)

export const fetchPopularTvMovies = createAsyncThunk(
    "movie/fetchPopularTvMovies",
    async (type) => {
        const response = await fetch("https://api.themoviedb.org/3/tv/popular?api_key=d89ca1152ea0fd22221e943bf8085fd1")
        const data = await response.json()
        return data.results
    }
)

export const fetchtype = createAsyncThunk(
    "movie/fetchtype",
    async (array) => {
        const { f, query, y, p } = array
        const response = await fetch(`https://api.themoviedb.org/3/${f}?api_key=d89ca1152ea0fd22221e943bf8085fd1${query}${y}${p}`)
        const data = await response.json()
        return data.results
    }
)

export const fetchMovieDetairl = createAsyncThunk(
    "movie/fetchMovieDetairl",
    async (details) => {
        const response = await fetch(`https://api.themoviedb.org/3/${details.option}/${details.id}?api_key=d89ca1152ea0fd22221e943bf8085fd1`)
        const data = await response.json()
        return data
    }
)



const initialState = {
    activeMenu: false,
    optionType: "",
    format: "movie",
    year: "",
    search: "",
    page:1,
    userName: "",
    favorite: [],
    movie: [],
    detailsMovie: [],
    popularMovies: [],
    popularTvMovies: [],
    errorsUser:"",
    status:"LOADING",
    optionsArray: {
        Year: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990], Format: ["Movie", "TV", "Person", "Multi", "Top Rated"]
    }
}



const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setActiveMenu: (state) => {
            state.activeMenu = !state.activeMenu
        },
        setOptionName: (state, { payload }) => {
            state.optionType = payload
        },
        setSearch: (state, { payload }) => {
            state.search = payload
            state.format = "search/movie"
        },
        setFormat: (state, { payload }) => {
            if(payload==="Top Rated") {
                state.format="movie/top_rated"
            }
            if(payload==="Multi" ){
                state.format="search/multi"
                state.search="1"
            }
            else{
                state.format = payload
            }
           
        },
        setYear: (state, { payload }) => {
            state.year = payload
        },
        setPage: (state, { payload }) => {
            state.page = payload
        },
        setUserName: (state, { payload }) => {
            state.userName = payload
        },
        setFavorite: (state, { payload }) => {
            state.favorite = payload
        },
        setClearAll: (state) => {
            state.year = ""
            state.search = ""
        },
        setErrorsUser:(state,{payload})=>{
            state.errorsUser=payload
        },
    },
    extraReducers: {
        [fetchPopularMovies.pending]: (state) => {
            state.status="LOADING"
        },
        [fetchPopularMovies.fulfilled]: (state, { payload }) => {
            state.popularMovies = payload
            state.movie = payload[Math.floor(Math.random() * payload.length)]
        },
        [fetchPopularTvMovies.fulfilled]: (state, { payload }) => {
            state.popularTvMovies = payload
        },
        [fetchMovieDetairl.pending]: (state) => {
            state.status="LOADING"
        },
        [fetchMovieDetairl.fulfilled]: (state, { payload }) => {
            state.detailsMovie = payload
            state.status="SUCCESS"
        },
        [fetchtype.pending]: (state, { payload }) => {
            state.status="LOADING"
        },
        [fetchtype.fulfilled]: (state, { payload }) => {
            state.popularMovies = payload
            state.status="SUCCESS"
        },
        [fetchtype.rejected]: (state, { payload }) => {
            console.log(payload)
        },
    }
})



export const { setActiveMenu, setOptionName, setSearch, setFormat, setYear, setOptionYear, setUserName, setFavorite,setPage,setClearAll,setErrorsUser} = movieSlice.actions
export default movieSlice.reducer