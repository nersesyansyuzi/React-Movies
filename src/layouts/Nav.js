import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { setActiveMenu } from '../redux/Slice/MovieSlice';
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMenuFold } from "react-icons/ai"
import Dropdown from './Dropdown';



const navLink = [
    {
        id: 0,
        path: "/",
        link: "Home"
    },
    {
        id: 1,
        path: "search",
        link: "Search",
    }
]


function Nav() {

    const { activeMenu } = useSelector((state) => state.movie)
    const dispatch = useDispatch()
    const [size, setSize] = useState(0)
    const [showMenuIcons, setShowMenuIcons] = useState(false)
    const [showDrop, setShowDrop] = useState(false)

    useEffect(() => {
        if ((document.documentElement.scrollWidth || size) <= 900) setShowMenuIcons(true)
        else setShowMenuIcons(false)

        const resize = (e) => setSize(e.target.innerWidth)
        window.addEventListener("resize", resize)

        return () => document.removeEventListener("resize", resize)
    }, [size])


    return (
        <nav className={activeMenu ? "" : ""}>
            <ul >
                {showMenuIcons && <div className='menu-icons' onClick={() => dispatch(setActiveMenu())} ><AiOutlineMenuFold /></div>}
                {navLink.map((elem) => {
                    const { id, path, link } = elem
                    if (link === "Search") {
                        return <NavLink to={path} className="link" key={id} onMouseEnter={() => setShowDrop(true)} onMouseLeave={() => setShowDrop(false)} >
                                {link}
                                {showDrop && <Dropdown />}
                        </NavLink>
                    }
                    return <NavLink key={id} to={path} className="link">{link}</NavLink>
                })}
            </ul>
        </nav>
    )
}

export default Nav


