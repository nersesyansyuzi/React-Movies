import { onSnapshot, collection, doc } from "firebase/firestore"
import { useEffect } from "react"
import { db } from "../../firebase/Firebase"
import { useDispatch, useSelector } from "react-redux"
import { setFavorite } from "../../redux/Slice/MovieSlice"
import "./profile.style.scss"


const imgs = "https://image.tmdb.org/t/p/original/"

function Profile() {

    const dispatch = useDispatch()
    const { favorite, userName } = useSelector(state => state.movie)
    const colRef = collection(db, "favoritesMovie")

    useEffect(() => {
        onSnapshot(doc(colRef, userName), (snapshot) => {
            dispatch(setFavorite(snapshot.data().favorite))
        })
    }, [])


    return (
        <main className='profile'>
            <div className="profile-container">
                <div className="user-content">
                    <div className="user">
                        <img src="img/user.jpg" alt="user" />
                        <h2>{userName}</h2>
                    </div>
                    <div className="favorites-container">
                        <h3>Favorites </h3>
                        <div className="favorites-box">
                            {favorite.map((elem) => {
                                const { Type, Name, id, img } = elem
                                return <div className="favorite" key={id}>
                                    <p>{Type}</p>
                                    <div className="favorite-wrap">
                                        <img src={imgs + img} alt="user" className="favorite-img" />
                                        <p>{Name}</p>
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Profile