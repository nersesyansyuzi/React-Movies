import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosSearch } from "react-icons/io"
import { AiOutlineClose } from 'react-icons/ai'
import { FiChevronDown } from "react-icons/fi"
import { BsTagsFill } from "react-icons/bs"
import { fetchtype, setClearAll, setPage } from '../../redux/Slice/MovieSlice'
import SearchOptions from './SearchOptions'
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"
import Skeleton from '../skeleton/Skeleton'
import "./search.style.scss"
import { Link } from 'react-router-dom'


const imgs = "https://image.tmdb.org/t/p/original/"
const searchMap = [
  {
    id: 0,
    svg: <IoIosSearch className='searcicons' />,
    svgclose: <AiOutlineClose className='closeicons' />,
    type: "Search"
  },
  {
    id: 1,
    svg: <FiChevronDown />,
    type: "Year"
  },
  {
    id: 2,
    svg: <FiChevronDown />,
    type: "Format"
  },
]

function Search() {

  const dispatch = useDispatch()
  const { popularMovies, format, year, search, page, status } = useSelector((state) => state.movie)


  function nextPage(direction) {
    if (direction === "right") dispatch(setPage(page + 1))
    else dispatch(setPage(page - 1))
  }



  useEffect(() => {
    const f = format ? `${format.toLowerCase()}/popular/` : ""
    const query = search ? `&query=${search}` : ""
    const y = year ? `&year=${year}` : ""
    const p = `&page=${page}`

    dispatch(fetchtype({ f, query, y, p }))

  }, [format, year, search, page])


  return (
    <main className='main-search'>
      <div className='container'   >
        <div className='filters-wrap'>
          <div className='filters'>
            {searchMap.map((elem) => {
              const { id, svg, type, svgclose } = elem
              return <SearchOptions id={id} svg={svg} elem={type} key={id} svgclose={svgclose} />
            })}
          </div>
        </div>
        <>
          {(format && year && search) ||
            <div className='filter-options'>
              <BsTagsFill />
              {format && <span>{format}</span>}
              {year && <span>{year}</span>}
              {search && <span>{search}</span>}
              {(year || search) && <span className='clear' onClick={() => dispatch(setClearAll())}>Clear All</span>}
            </div>}
        </>
        <div className='search-wrapper'>
          {status === "LOADING"
            ?
            new Array(20).fill(<Skeleton />).map((elem, id) => {
              return <div key={id}>{elem}</div>
            })
            :
            popularMovies.map((elem) => {
              const { title, poster_path: posterImg, id, profile_path, name } = elem
              return <Link to={`/details/${format.toLowerCase()}/${id}`} className='popular-movie' key={id}>
                <div className="movie">
                  <div className="movie-wrapper">
                    <img src={imgs + (posterImg || profile_path)} alt={title} />
                    <h4>{title || name}</h4>
                  </div>
                </div>
              </Link>
            }
            )
          }
        </div>
        <div className='search-reg'>
          {page > 1 && <AiFillLeftCircle onClick={() => nextPage("left")} />}
          <AiFillRightCircle onClick={() => nextPage("right")} />
        </div>
      </div>
    </main>
  )
}

export default Search


