import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/images/logo/logo.png"
import { useDispatch, useSelector } from 'react-redux'
import { NavDropdown } from 'react-bootstrap'
import { logoutUser } from '../redux/reducers/userReducer.js'

const NavItems = () => {
    const { user, loading } = useSelector((state) => state.userReducer)
    console.log(user)

    const { cartItems, loading: cartLoading } = useSelector((state) => state.cartReducer)
    console.log(cartItems)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [menuToggle, setMenuToggle] = useState(false)
    const [socialToggle, setSocialToggle] = useState(false)
    const [headerFixed, setHeaderFixed] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    window.addEventListener("scroll", () => {
        if(window.scrollY > 150) {
            setHeaderFixed(true)
        } else{
            setHeaderFixed(false)
        }
    })

    const logoutHandler = () => {
        dispatch(logoutUser())
        navigate("/login")
    }

    return (
        <header>
            <div className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""}`}>
                <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
                    <div className="container">
                        <div className="header-top-area">
                            {user ? (
                                <>
                                <Link to={'/profile'} className='lab-btn me-2'><span>{user?.name}</span></Link>
                                <a className='mx-4' onClick={logoutHandler}>Logout</a>
                                </>
                      
                            ) : (
                                <>
                                <Link to={'/signup'} className='lab-btn me-2'><span>Create Account</span></Link>
                                <Link to={"/login"}>Login</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div> 

                <div className="header-bottom">
                    <div className="container">
                        <div className="header-wrapper">
                            {/* LOGO */}
                            <div className="logo-search-acte">
                                <div className="logo">
                                    <Link to={'/'}>
                                        <img src={logo} alt='logo' />
                                    </Link>
                                </div>
                            </div>
                            {/* Menu Area */}
                            <div className="menu-area">
                                <div className="menu">
                                    <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                                        <li><Link to={'/'}>Home</Link></li>
                                        <li><Link to={'/shop'}>Shop</Link></li>
                                        <li><Link to={'/blog'}>Blog</Link></li>
                                        <li><Link to={'/about'}>About</Link></li>
                                        <li><Link to={'/contact'}>Contact</Link></li>
                                    </ul> 
                                </div>
                                {user ? (
                                    <div className='profile-section'>
                                        <div className='mx-2 profile-name' onClick={() => setDropdownOpen(!dropdownOpen)}>
                                            {user?.name}
                                        </div> 
                                        <NavDropdown id="basic-nav-dropdown" show={dropdownOpen} onClick={() => setDropdownOpen(!dropdownOpen)}>
                                            <NavDropdown.Item onClick={logoutHandler} href='#'>
                                                Logout
                                            </NavDropdown.Item> 
                                            <NavDropdown.Item href="/profile">
                                                Profile
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/cart">
                                                Shopping Cart
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="/order">
                                                Order
                                            </NavDropdown.Item>
                                        </NavDropdown> 
                                    </div>
                                ) : (
                                    <div className='profile-section'>
                                    <Link to={'/signup'} className='lab-btn me-2'><span>Create Account</span></Link>
                                    <Link to={"/login"}>Login</Link>
                                    </div>
                                )}

                                {/* Menu Toggler */}
                                <div onClick={() => setMenuToggle(!menuToggle)} className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                {/* Social Toggler */}
                                <div className="ellepsis-bar d-md-none" onClick={() => setSocialToggle(!socialToggle)}>
                                    <i className="icofont-info-square"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavItems