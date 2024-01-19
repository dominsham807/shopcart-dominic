import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../constants.js';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
    const { user, loading } = useSelector((state) => state.userReducer)
    console.log(user)

    // const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, [user])

    const title = "Register Now";
    const socialTitle = "Register With Social Media";
    const btnText = "Get Started Now";

    let socialList = [
        {
          link: "#",
          iconName: "icofont-facebook",
          className: "facebook",
        },
        {
          link: "#",
          iconName: "icofont-twitter",
          className: "twitter",
        },
        {
          link: "#",
          iconName: "icofont-linkedin",
          className: "linkedin",
        },
        {
          link: "#",
          iconName: "icofont-instagram",
          className: "instagram",
        },
        {
          link: "#",
          iconName: "icofont-pinterest",
          className: "pinterest",
        },
    ]

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    const location = useLocation()

    const from = location.pathname 
    console.log(from)

    // const data = new FormData()
    // data.append("name", name)
    // data.append("email", email)
    // data.append("password", password)
    // console.log(data)

    console.log(name)

    const handleSignup = async(e) => {
        e.preventDefault()

        try{
            if(password !== confirmPassword){
                toast.error("Passwords not matched")
            } else{
                const res = await axios.post(`${BACKEND_URL}/api/users/register`, {
                    name, email, password, phone
                })
                console.log(res)
                if(res.data.success){
                    toast(res.data.message, { type: "success", draggable: false })
                    navigate("/login")
                } else{
                    // toast(res.data.message, { type: "error", draggable:false })
                    setErrorMessage(res.data.message)
                }
            } 
        } catch(error){
            console.log(error)
            toast("Something Went Wrong", { type: "error", draggable:false })
            // setErrorMessage(res.data.message)
        }
    }

    return (
        <div>
            <div className="login-section padding-tb section-bg">
                <div className="container">
                    <div className="account-wrapper">
                        <h3 className="title">{title}</h3>
                        <form className="account-form" onSubmit={handleSignup}>
                            <div className="form-group">
                                <input type="text" name='name' placeholder='Name' 
                                value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="email" name='email' placeholder='Email' 
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="text" name='phone' placeholder='Phone Number' 
                                value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <input type="password" name='password' placeholder='Password' 
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="password" name='confirmPassword' placeholder='Confirm Password' 
                                 value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div>
                                {errorMessage && (
                                    <div className="error-message text-danger">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <button className="lab-btn" type='submit'>
                                    <span>{btnText}</span>
                                </button>
                            </div>
                        </form>
                        <div className="account-bottom">
                            <span className="d-block cate pt-10">
                                Are you a member? <Link to={"/login"}>Login</Link>
                            </span>
                            <span className="or">
                                <span>or</span>
                            </span>
                            <h5 className="subtitle">{socialTitle}</h5>
                            <ul className="lab-ul social-icons justify-content-center">
                                <li>
                                    <a href="/" className="github">
                                        <i className="icofont-github"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="facebook">
                                        <i className="icofont-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="twitter">
                                        <i className="icofont-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="linkedin">
                                        <i className="icofont-linkedin"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="instagram">
                                        <i className="icofont-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup