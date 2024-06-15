import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import Loader from '../layout/Loader/loader'
import { useSelector, useDispatch } from "react-redux"
import { resetPassword, clearErrors } from '../../actions/userActions';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import Input from '@mui/joy/Input';



const ResetPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    let { token } = useParams();


    const { error, success } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");
            navigate('/login');
        }
    }, [alert, dispatch, error, success, navigate])

    return (
        <Fragment>
            {<Fragment>
                <MetaData title={"Reset Profile"} />
                <div className="w-screen h-screen flex sm:flex-col-reverse items-center justify-center bg-white">
                    <div className="w-1/3 md:w-1/2 sm:w-5/6 min-w-52 flex flex-col items-center justify-center box-border overflow-hidden bg-slate-50 rounded-xl py-4 my-4">
                        <h2 className='my-3 text-xl'>Reset Password</h2>
                        <form onSubmit={resetPasswordSubmit} className="flex items-center flex-col m-auto padding-6 h-5/6 w-full transition-all duration-500 pb-2" >
                            <div className="flex items-center w-5/6 my-2">
                                <Input startDecorator={<LockOpenIcon />} type="password" placeholder='New Password' required value={password} onChange={(e) => {
                                    setPassword(e.target.value)
                                }} className='w-full' sx={{fontSize: '14px'}} />
                            </div>
                            <div className="flex items-center w-5/6 my-2">
                                <Input startDecorator={<LockIcon />} type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }} className='w-full' sx={{fontSize: '14px'}} />
                            </div>
                            <Input type="submit" value="Change" className='w-5/6 hover:bg-red-700 transition-all duration-300 py-1 mt-6' sx={{backgroundColor: '#DB4444', color: '#ebebeb'}} />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default ResetPassword
