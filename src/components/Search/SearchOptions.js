import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import SearchDrop from './SearchDrop'
import debounce from 'lodash.debounce'
import { setFormat, setOptionName, setSearch } from '../../redux/Slice/MovieSlice'



function SearchOptions({ id, svg, elem, svgclose }) {

    const dispatch = useDispatch()
    const [showSearchDrop, setShowSearchDrop] = useState(false)
    const [inputValue, setInputValue] = useState("")



    function handleShowOptions() {
        dispatch(setOptionName(elem))
        setShowSearchDrop(!showSearchDrop)
    };

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearch(str))
        }, 500),
        [],
    );

    function onChangeSearchInput(e) {
        setInputValue(e.target.value)
        updateSearchValue(e.target.value)

    };

    function handleClear() {
        setInputValue("")
        dispatch(setFormat("movie"))
    }



    return (
        <div className='filter' key={id} onClick={handleShowOptions} onMouseLeave={() => setShowSearchDrop(false)}  >
            <p>{elem}</p>
            <div className='search-wrap' >
                {elem === "Format" ?
                    <div className='select format'></div>
                    :
                    <input type="search" className={0 === id ? "select search" : "select"} value={inputValue} onChange={(e) => elem === "Search" ? onChangeSearchInput(e) : ""} />
                }
                {inputValue && <div className='closeicons' onClick={handleClear}>{svgclose}</div>}
                {showSearchDrop && <SearchDrop />}
                <div className='searcicons'>{svg}</div>
            </div>
        </div>
    )
}

export default SearchOptions


