import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../constants.js';
import { loginUser } from '../redux/reducers/userReducer.js';
import toast from 'react-hot-toast';

const Login = () => {
    const { user, loading } = useSelector((state) => state.userReducer)
    console.log(user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, [user])

    const title = "Login";
    const socialTitle = "Login With Social Media"
    const btnText = "Login"

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    const handleLogin = async(e) => {
        e.preventDefault()

        try{
            const res = await axios.post(`${BACKEND_URL}/api/users/login`, {
                email, password
            })
            console.log(res)
            if(res?.data?.success){
                dispatch(loginUser(res?.data?.user))
                toast.success(res.data.message)
                navigate("/")
            } else{
                toast.error(res?.data?.message)
            }
        } catch(error){
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <div>
            <div className="login-section padding-tb section-bg">
                <div className="container">
                    <div className="account-wrapper">
                        <h3 className="title">{title}</h3>
                        <form onSubmit={handleLogin} className="account-form">
                            <div className="form-group">
                                <input type="email" name='email' placeholder='Email*' 
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <input type="password" name='password' placeholder='Password*' 
                                value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div>
                                {errorMessage && (
                                    <div className="error-message text-danger">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                                    <div className="checkgroup">
                                        <input type='checkbox' name='remember' id='remember' />
                                        <label htmlFor="remember">Remember Me</label>
                                    </div>
                                    <Link to={"/forget-password"}>Forgot Password?</Link>
                                </div>
                            </div>
                            <div className="form-group text-center">
                                <button className="d-block lab-btn">
                                    <span>{btnText}</span>
                                </button>
                            </div>
                        </form>
                        <div className="account-bottom">
                            <span className="d-block cate pt-10">
                                Don't have an account? <Link to={'/signup'}>Sign Up</Link>
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

export default Login