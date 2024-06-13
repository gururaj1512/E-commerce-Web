import './Styles/Transitions.css'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Loader from '../layout/Loader/Loader'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux"
import { login, register, clearErrors } from '../../actions/userActions';
import { useAlert } from 'react-alert'
import { Lock, Mail, Person } from '@mui/icons-material';
import Input from '@mui/joy/Input';
import loginDisplay from '../../images/loginDisplay.jpg'


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
                    <div className="w-screen h-screen flex sm:flex-col-reverse items-center justify-center bg-white">
                        <div className="w-1/2 sm:w-full h-full sm:hidden">
                            <img src={loginDisplay} alt="" className='h-full w-full object-fill' />
                        </div>
                        <div className="w-1/2 sm:w-5/6 flex items-center justify-center">
                            <div className="w-2/3 sm:w-full h-80 box-border overflow-hidden bg-slate-100 rounded-xl">
                                <div className='slider-btns'>
                                    <div className="flex h-8">
                                        <p onClick={(e) => switchTabs(e, "login")} className='text-black text-sm grid place-items-center p-5 w-full cursor-pointer transition-all hover:text-main-red'>LOGIN</p>
                                        <p onClick={(e) => switchTabs(e, "register")} className='text-black text-sm grid place-items-center p-5 w-full cursor-pointer transition-all hover:text-main-red'>REGISTER</p>
                                    </div>
                                    <button ref={switcherTab} className='bg-main-red h-1 w-1/2 transition-all duration-500 rounded-full'></button>
                                </div>
                                <form ref={loginTab} onSubmit={loginSubmit} className="flex items-center flex-col m-auto padding-6 h-5/6 transition-all duration-500 pt-2  pb-2">
                                    <div className="flex items-center w-5/6 my-2">
                                        <Input startDecorator={<Mail />} type="email" placeholder='Email' required value={loginEmail} onChange={(e) => {
                                            setLoginEmail(e.target.value)
                                        }} className='w-full' />
                                    </div>
                                    <div className="flex items-center w-5/6 my-2">
                                        <Input startDecorator={<Lock />} type="password" placeholder='Password' required value={loginPassword} onChange={(e) => {
                                            setLoginPassword(e.target.value)
                                        }} className='w-full' />
                                    </div>
                                    <div className="flex items-center w-5/6 mt-20">
                                        <Input type="submit" value={"Login"} className='w-1/2 hover:bg-red-700 transition-all duration-300 py-2' sx={{backgroundColor: '#DB4444', color: '#ebebeb'}} />
                                        <Link to='/password/forgot' className='w-1/2 text-sm hover:text-blue-500 text-blue-950 text-end'>Forgot password</Link>
                                    </div>
                                </form>
                                <form className="flex items-center flex-col m-auto padding-6 h-5/6 transition-all duration-500 pb-2" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                                    <div className="flex items-center w-5/6 my-2">
                                        <Input startDecorator={<Person />} type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange} className='w-full' />
                                    </div>
                                    <div className="flex items-center w-5/6 my-2">
                                        <Input startDecorator={<Mail />} type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} className='w-full' />
                                    </div>
                                    <div className="flex items-center w-5/6 my-2">
                                        <Input startDecorator={<Lock />} type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange} className='w-full' />
                                    </div>
                                    <div className="flex items-center w-5/6 my-2">
                                        <img className='h-9 w-9 mr-4 rounded-full' src={avatarPreview} alt="Avatar Preview" />
                                        <Input type="file" name="avatar" accept="image/*" onChange={registerDataChange} className='w-full text-sm' size='xs'/>
                                    </div>
                                    <Input type="submit" value="Register" className='w-5/6 hover:bg-red-700 transition-all duration-300 py-1 my-2' sx={{backgroundColor: '#DB4444', color: '#ebebeb'}} />
                                </form>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default LoginSignup
