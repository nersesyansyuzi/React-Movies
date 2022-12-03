import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MdFavorite } from "react-icons/md"
import { fetchMovieDetairl } from '../../redux/Slice/MovieSlice'
import { collection, updateDoc, doc, arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import "./details.style.scss"

const imgs = "https://image.tmdb.org/t/p/original/"

function Details() {
    const dispatch = useDispatch()
    const { detailsMovie, userName, status } = useSelector(state => state.movie)
    const { id, option } = useParams()
    const colRef = collection(db, "favoritesMovie")


    async function handleFaforite() {
        if (!userName) return
        await updateDoc(doc(colRef, userName), {
            favorite: arrayUnion({
                Type: option,
                Name: detailsMovie.title || detailsMovie.name,
                img: detailsMovie.poster_path,
                id
            })
        })
    }

    useEffect(() => {
        dispatch(fetchMovieDetairl({
            id,
            option
        }))
    }, [])

    return (
        <main className='main-details' style={{ backgroundImage: `url(${imgs + detailsMovie.poster_path})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <header className='header-details' >
                {status === "LOADING"
                    ?
                    <div className="spin-wrapper">
                        <div className="spinner"></div>
                    </div>
                    :
                    <div className='container-details'>
                        <div className='details-wrapper'>
                            <div className='details-img'>
                                <img src={imgs + (detailsMovie.poster_path || detailsMovie.profile_path)} alt="img" />
                            </div>
                            <div className='details-info'>
                                <h1>{detailsMovie.title || detailsMovie.name}</h1>
                                <div className='favorite' > <MdFavorite onClick={() => handleFaforite()} /></div>
                                {detailsMovie.overview && <div>
                                    <span>Overview</span>
                                    <p> {detailsMovie.overview}</p>
                                </div>}
                            </div>
                        </div>
                    </div>
                }
            </header>
        </main>
    )
}


export default Details