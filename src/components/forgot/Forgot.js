import { NavLink } from 'react-router-dom'
import { auth, resetPassword } from "../../firebase/Firebase"
import { useRef } from "react"
import { setErrorsUser } from "../../redux/Slice/MovieSlice"
import { useDispatch, useSelector } from "react-redux"
import { BsFillXCircleFill } from "react-icons/bs"
import "./forgot.style.scss"


function Forgot() {
    const emailRef = useRef("")
    const dispatch = useDispatch()
    const { errorsUser } = useSelector(state => state.movie)

    async function mySubmit(e) {
        e.preventDefault()
        await resetPassword(auth, emailRef).catch(err => {
            if (err.code === "auth/network-request-failed") dispatch(setErrorsUser("Incorrect email"))

            setTimeout(() => {
                dispatch(setErrorsUser(""))
            }, 4000);

        })
    }

    return (
        <main className='reset-login'>
            <div className='reset-form'>
                {errorsUser && <div className='forgot-user-error'><BsFillXCircleFill /> {errorsUser}</div>}
                <h1>Reset Password</h1>
                <form onSubmit={(e) => mySubmit(e)}>
                    <input placeholder='Email' name='email' ref={emailRef} />
                    <button onSubmit={(e) => mySubmit(e)}>Reset Password</button>
                    <NavLink to={"/login"}>Login</NavLink>
                </form>
            </div>
        </main>
    )
}

export default Forgot