import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth, signinUser } from '../../firebase/Firebase'
import { setErrorsUser, setUserName } from '../../redux/Slice/MovieSlice'
import { BsFillXCircleFill } from "react-icons/bs"
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai"
import "./login.style.scss"
import { useState } from 'react'


function Login() {

  const dispatch = useDispatch();
  const { errorsUser } = useSelector(state => state.movie)
  const homeNaviate = useNavigate()
  const [showPassword,setShowPassword]=useState(false)

  async function mySubmit(e) {
    e.preventDefault()
    const { email, password } = { ...Object.fromEntries([...new FormData(e.target)]) }

    await signinUser(auth, email, password).then((user) => {
      dispatch(setUserName(user.user.email))
      homeNaviate("/")
    }).catch(err => {
      if (err.code === "auth/user-not-found" && "auth/wrong-password") dispatch(setErrorsUser("Login failed. Incorrect email or password."))
      setTimeout(() => {
        dispatch(setErrorsUser(""))
      }, 4000);

    })

  }

  return (
    <main className='main-login'>
      <div className='login-form container'>
        {errorsUser && <div className='login-user-error'><BsFillXCircleFill /> {errorsUser}</div>}
        <h1>Login</h1>
        <form onSubmit={(e) => mySubmit(e)}>
          <input placeholder='Email' name='email' />
          <div className='password-wrap'>
            <input type={showPassword ? "text" :"password"} placeholder='Password' name='password' />
            {showPassword ? <AiFillEyeInvisible  onClick={()=>setShowPassword(!showPassword)} /> :<AiFillEye onClick={()=>setShowPassword(!showPassword)} />}
          </div>
          <button onSubmit={(e) => mySubmit(e)}>Login</button>
          <NavLink to={"/forgot"}>Forgot password?</NavLink>
          <NavLink to={"/signup"}>Create an account</NavLink>
        </form>
      </div>
    </main>
  )
}

export default Login