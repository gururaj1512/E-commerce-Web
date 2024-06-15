import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Loader from '../layout/Loader/Loader'
import { useSelector, useDispatch } from "react-redux"
import { forgotPassword, clearErrors } from '../../actions/userActions';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData';
import Input from '@mui/joy/Input';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Forgot Password" />
                    <div className="w-screen h-screen flex sm:flex-col-reverse items-center justify-center bg-white">
                        <div className="w-1/3 md:w-1/2 sm:w-5/6 min-w-52 flex flex-col items-center justify-center box-border overflow-hidden bg-slate-50 rounded-xl py-4">
                            <h2 className='my-3 text-xl'>Forgot Password</h2>
                            <form onSubmit={forgotPasswordSubmit} className="flex items-center flex-col m-auto padding-6 h-5/6 w-full transition-all duration-500 pb-2">
                                <div className="flex items-center w-5/6 my-2">
                                    <Input startDecorator={<EmailOutlinedIcon />} type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full' sx={{fontSize: '14px'}} />
                                </div>
                                <Input type="submit" value="Send" className='w-5/6 hover:bg-red-700 transition-all duration-300 py-1 mt-6' sx={{backgroundColor: '#DB4444', color: '#ebebeb'}} />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ForgotPassword;
