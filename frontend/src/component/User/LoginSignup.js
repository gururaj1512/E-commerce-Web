import './LoginSignup.css'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Loader from '../layout/Loader/loader'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import { useSelector, useDispatch } from "react-redux"
import { login, register, clearErrors } from '../../actions/userActions';
import { useAlert } from 'react-alert'


const LoginSignup = () => {
    const alert = useAlert()
    const dispatch = useDispatch();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation();

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        dispatch(register(myForm))
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const redirect = location.search ? `/${location.search.split("=")[1]}` : "/account";

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate(`${redirect}`);
        }
    }, [alert, dispatch, error, isAuthenticated, navigate, redirect])

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

    return (
        <Fragment>
            {
                loading ? <Loader /> : <Fragment>
                    <div className="LoginSignupContainer">
                        <div className="LoginSignupBox">
                            <div className='slider-btns'>
                                <div className="login_signup_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form ref={loginTab} onSubmit={loginSubmit} className="loginForm">
                                <div className="loginEmail">
                                    <EmailOutlinedIcon />
                                    <input type="email" placeholder='Email' required value={loginEmail} onChange={(e) => {
                                        setLoginEmail(e.target.value)
                                    }} />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password" placeholder='Password' required value={loginPassword} onChange={(e) => {
                                        setLoginPassword(e.target.value)
                                    }} />
                                </div>
                                <Link to='/password/forgot'>Forgot password</Link>
                                <input type="submit" value={"Login"} className='loginBtn' />
                            </form>
                            <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <PermIdentityIcon />
                                    <input type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange} />
                                </div>
                                <div className="signUpEmail">
                                    <EmailOutlinedIcon />
                                    <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} />
                                </div>
                                <div className="signUpPassword">
                                    <LockOpenIcon />
                                    <input type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange} />
                                </div>
                                <div className="registerImage">
                                    <img className='demoProfile' src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file" name="avatar" accept="image/*" onChange={registerDataChange} />
                                </div>
                                <input type="submit" value="Register" className="signUpBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default LoginSignup
