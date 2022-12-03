import React from 'react'
import { MdArrowDropUp } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { setFormat } from '../redux/Slice/MovieSlice'

const drop = [
    {
        id: 4,
        path: "movie",
        name: "Movie"
    },
    {
        id: 5,
        path: "tv",
        name: "Tv"
    },

]

function Dropdown() {
    
    const dispatch=useDispatch()

    function handleClick(path){
       dispatch(setFormat(path))
    }
    return (
        <div className='dropdown'>
            <MdArrowDropUp />
            {drop.map((elem) => {
                const { id, name, path } = elem
                return <li key={id} className="dropdown-link" onClick={()=>handleClick(path)}>{name}</li>
            })}
        </div>
    )
}

export default Dropdown