import './LoginSignup.css'
import React, { Fragment, useRef, useState } from 'react'
import Loader from '../layout/Loader/loader'
import { Link } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Profile from '../../images/Profile.webp'


const LoginSignup = () => {

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
    const [avatarPreview, setAvatarPreview] = useState("/Profile.webp");

    const loginSubmit = (e) => {
        console.log("Login Form Submitted");
    }
    
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        console.log("Signup Form Submitted");
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
            setUser({...user, [e.target.name]: e.target.value})
        }
    }

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
            <div className="LoginSignupContainer">
                <div className="LoginSignupBox">
                    <div>
                        <div className="login_signup_toggle">
                            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form ref={loginTab} onSubmit={loginSubmit} className="loginForm">
                        <div className="loginEmail">
                            <EmailOutlinedIcon/>
                            <input type="email" placeholder='Email' required value={loginEmail} onChange={(e) => {
                                setLoginEmail(e.target.value)
                            }}/>
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon/>
                            <input type="password" placeholder='Password' required value={loginEmail} onChange={(e) => {
                                setLoginPassword(e.target.value)
                            }}/>
                        </div>
                        <Link to='/password/forgot'>Forgot password</Link>
                        <input type="submit" value={"Login"} className='loginBtn' />
                    </form>
                    <form ref={registerTab} onSubmit={registerSubmit} encType='multipart/form-data' className="signUpForm">
                        <div className="signUpName">
                            <PermIdentityIcon/>
                            <input type="text" placeholder='Name' required value={name} onChange={registerDataChange}/>
                        </div>
                        <div className="signUpEmail">
                            <EmailOutlinedIcon/>
                            <input type="email" placeholder='Email' required value={email} onChange={registerDataChange}/>
                        </div>
                        <div className="signUpPassword">
                            <LockOpenIcon/>
                            <input type="password" placeholder='Password' required value={password} onChange={registerDataChange}/>
                        </div>
                        <div className="registerImage">
                            <img src={avatarPreview} alt="Profile Img" />
                            <input type="file" name='avatar' accept='image/*' onChange={registerDataChange} />
                        </div>
                        <input type="submit" value={"Register"} className='signUpBtn' /*disabled={loading ? true : false}*/ />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default LoginSignup
