import { useSelector, useDispatch } from "react-redux"
import { setFormat, setYear } from "../../redux/Slice/MovieSlice"


function SearchDrop() {

    const dispatch = useDispatch()
    const { optionType, optionsArray } = useSelector(state => state.movie)
    const option = optionsArray[optionType]



    function handleClick(elem) {
        const option = optionType === "Format" ? dispatch(setFormat(elem)) : dispatch(setYear(elem))
    }

    return (
        <>
            {option && <div className='options'>
                <ul>
                    {option.map((elem, index) => {
                        return <li key={index} onClick={() => handleClick(elem)}>{elem}</li>
                    })}
                </ul>
            </div>}
        </>

    )
}

export default SearchDrop