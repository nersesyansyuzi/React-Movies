import { NavLink } from "react-router-dom"
import "./error.style.scss"

function ErrorPage() {
  return (
    <main className="error-main"> 
        <div className="error-container">
             <h1>404</h1>
             <p>Page Not Found</p>
             <NavLink to={"/"}>Home</NavLink>
        </div>
    </main>
  )
}

export default ErrorPage