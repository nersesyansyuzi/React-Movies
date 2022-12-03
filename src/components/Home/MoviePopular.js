import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "../../redux/Slice/MovieSlice";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const imgs = "https://image.tmdb.org/t/p/original/"

function MoviePopular() {
    const dispatch = useDispatch()
    const { popularMovies } = useSelector((state) => state.movie)

    const [count, setCount] = useState(1)
    const lineRef = useRef()
    const sliderRef = useRef()

    function slider(direction) {
        if (direction === "right") {
            setCount(count + 1)
            sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + sliderRef.current.offsetWidth
            lineRef.current.style.width = ((count) / 3) * 100 + "%"
        }
        else {
            lineRef.current.style.width = ((count - 1) / 4) * 100 + "%"
            setCount(count - 1)
            sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - sliderRef.current.offsetWidth
        }
    }




    useEffect(() => {
        if (count > 4) setCount(4)
        if (count < 1) setCount(1)

    }, [count])

    useEffect(() => {
        dispatch(fetchPopularMovies())
    }, [])

    return (
        <div ref={sliderRef} className="slider">
            <h3>Most  Popular</h3>
            <div className="popular" >
                <div className='slider-reg'>
                    <AiFillLeftCircle onClick={() => slider("left")} />
                    <AiFillRightCircle onClick={() => slider("right")} />
                </div>
                {popularMovies.map((elem) => {
                    const { title, poster_path: posterImg, id, overview } = elem
                    return <Link to={`details/movie/${id}`} key={id} >
                        <div className='popular-movie'  >
                            <div className="movie">
                                <img src={imgs + posterImg} alt={title} />
                                <h4>{title} </h4>
                                <div className="overview">
                                    <h4>Overview</h4>
                                    <span>{overview}</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                }
                )}
            </div>
            <div className="line" >
                <div ref={lineRef}></div>
            </div>

        </div>

    )
}


export default MoviePopular

