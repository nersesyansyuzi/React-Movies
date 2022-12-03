import { useSelector, useDispatch } from "react-redux";
import MoviePopular from './MoviePopular';
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchPopularTvMovies } from "../../redux/Slice/MovieSlice";
import "./home.style.scss"

const imgs = "https://image.tmdb.org/t/p/original/"


function Home() {

    const { movie, popularTvMovies } = useSelector((state) => state.movie)
    const dispatch = useDispatch()
    const detailsNavigate = useNavigate()

    function sliceTitle(str, num) {
        if (num < str?.length) return str.slice(0, num) + "..."
        return str
    }


    useEffect(() => {
        dispatch(fetchPopularTvMovies())
    }, [])




    return (
        <main>
            <header className="header" style={{ backgroundImage: `url(${imgs + movie.backdrop_path})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="container">
                    <h1>{movie.title}</h1>
                    <h5>{sliceTitle(movie.overview, 250)}</h5>
                    <button onClick={() => detailsNavigate(`details/movie/${movie.id}`)}>Read More</button>
                </div>
            </header>
            <section>
                <div className='container'  >
                    <MoviePopular />
                    <div className="slider-tv">
                        <h3>Most Tv Popular</h3>
                        <div className="tv-popular">
                            {popularTvMovies.map((elem) => {
                                const { name, poster_path: posterImg, id, overview, vote_average } = elem
                                return <Link key={id} to={`details/tv/${id}`}>
                                    <div key={id} className="popular-Tvmovie" >
                                        <div className="tv">
                                            <img src={imgs + posterImg} alt={name} />
                                            <h4>{name}</h4>
                                            {overview && <div className="overview">
                                                <h4>Overview</h4>
                                                <span>{overview}</span>
                                            </div>}

                                        </div>
                                    </div>
                                </Link>

                            }
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home