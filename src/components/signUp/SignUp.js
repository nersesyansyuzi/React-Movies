import *  as yup from "yup"
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, auth } from '../../firebase/Firebase'
import { setErrorsUser, setUserName } from '../../redux/Slice/MovieSlice'
import { BsFillXCircleFill } from "react-icons/bs"
import "./signup.style.scss"

const mySchema = yup.object().shape({
    email: yup.string().email().required("Email required"),
    userName: yup.string().required("Name required"),
    password: yup.string().max(8, "max 8 characters").required("Password required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]).required("ConfirmPassword required")
})


function SignUp() {
    const dispatch = useDispatch()
    const { errorsUser } = useSelector(state => state.movie)

    async function mySubmit(values, { setSubmitting, resetForm }) {
        setSubmitting(true)

        await createUser(auth, values.email, values.password).then((user => {
            dispatch(setUserName(user.user.email))
        })).catch(err => {
            if (err.code === "auth/email-already-in-use") dispatch(setErrorsUser("Email address already in use"))

            setTimeout(() => {
                dispatch(setErrorsUser(""))
            }, 4000);

        })
        setTimeout(() => {
            setSubmitting(false)
            resetForm()
        }, 2000);
    }


    return (
        <main className='main-singup'>
            <div className='singup-form container'>
                {errorsUser && <div className='singup-user-error'><BsFillXCircleFill /> {errorsUser}</div>}
                <h1>Sign up</h1>

                <Formik
                    initialValues={{
                        email: "",
                        userName: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    onSubmit={mySubmit}
                    validationSchema={mySchema}
                >
                    {({
                        errors,
                        values,
                        touched,
                        handleChange,
                        handleSubmit,
                        isSubmitting

                    }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className='input-wrapper'>
                                    <input placeholder='Email' name='email' value={values.email} onChange={handleChange} />
                                    {touched.email && errors.email && <span >{errors.email}</span>}
                                </div>
                                <div className='input-wrapper'>
                                    <input placeholder='Username' name='userName' value={values.userName} onChange={handleChange} />
                                    {touched.userName && errors.userName && <span>{errors.userName}</span>}
                                </div>
                                <div className='input-wrapper'>
                                    <input type="password" placeholder='Password' name='password' value={values.password} onChange={handleChange} />
                                    {touched.password && errors.password && <span>{errors.password}</span>}
                                </div>
                                <div className='input-wrapper'>
                                    <input type="password" placeholder='Confirm Password' name='confirmPassword' value={values.confirmPassword} onChange={handleChange} />
                                    {touched.confirmPassword && errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                                </div>
                                <button onSubmit={handleSubmit} disabled={isSubmitting} type="submit" >Sign up</button>
                            </form>
                        )
                    }}

                </Formik>
            </div>
        </main>
    )
}

export default SignUp