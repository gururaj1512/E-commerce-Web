import React from 'react'
import './ResetPassword.css'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import Loader from '../layout/Loader/loader'
import { useSelector, useDispatch } from "react-redux"
import { resetPassword, clearErrors } from '../../actions/userActions';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';



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
                <div className="resetPasswordContainer">
                    <h2>Update Profile</h2>
                    <div className="resetPasswordBox">
                        <form className="resetPasswordForm" onSubmit={resetPasswordSubmit} >
                            <div className="resetPassword">
                                <LockOpenIcon />
                                <input type="password" placeholder='New Password' required value={password} onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                            </div>
                            <div className="resetPassword">
                                <LockIcon />
                                <input type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }} />
                            </div>
                            <input type="submit" value="Change" className="resetPasswordBtn" />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default ResetPassword
