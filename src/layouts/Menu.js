import { AiOutlineMenuUnfold } from "react-icons/ai"
import { AiOutlineMenuFold } from "react-icons/ai"
import { CgLogIn, CgLogOut } from "react-icons/cg"
import { FaUserAlt } from "react-icons/fa"
import { useLocation, useNavigate } from 'react-router-dom'
import { setActiveMenu, setUserName } from '../redux/Slice/MovieSlice'
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth"
import { auth } from "../firebase/Firebase"

function Menu() {
  
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { activeMenu, userName } = useSelector((state) => state.movie)

  function handleLogoutClick() {
    if (userName) {
      signOut(auth)
      navigate("/")
      dispatch(setUserName(""))
    }
    else {
      navigate("signup")
      dispatch(setActiveMenu())
    }
  }

  function handleLogintClick() {
    userName ? navigate("profile") : navigate("Login")
    dispatch(setActiveMenu())
  }


  return (

    <div className={activeMenu ? "sidenav " + " open" : "sidenav"}>
      <div className='container'>

        <div className='logo'>
          <h2>Menu</h2>
          {activeMenu ? <AiOutlineMenuFold className='close' onClick={() => dispatch(setActiveMenu())} /> : <AiOutlineMenuUnfold className='open' onClick={() => dispatch(setActiveMenu())} />}
        </div>

        <div className='nav'>
          <li onClick={handleLogintClick}>
            <FaUserAlt />
            <span >{userName ? "Profile" : "Login"}</span>
          </li>

          <li onClick={handleLogoutClick}>
            {userName ? <CgLogOut /> : <CgLogIn />}
            <span>{userName ? "Logout" : "Sign up"}</span>
          </li>

        </div>
      </div>
    </div>
  )
}

export default Menu